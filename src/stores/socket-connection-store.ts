import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatItem } from 'interfaces/model/chat-item';
import { MessageItem } from 'interfaces/model/message-item';
import { OnlineUser } from 'interfaces/model/online-user';
import { UserInfo } from 'interfaces/model/user-info';
import { autorun, makeAutoObservable } from 'mobx';
import { io, Socket } from 'socket.io-client';
import { Stores } from 'stores/stores';

export class SocketConnectionStore {
    socket: Socket | null = null;
    onlineUsers: Map<OnlineUser['id'], OnlineUser> = new Map<OnlineUser['id'], OnlineUser>();

    constructor(private stores: Stores) {
        makeAutoObservable(this);
    }

    addUser = (user: OnlineUser): void => {
        this.onlineUsers.set(user.id, user);
    };

    removeUser = (user: OnlineUser): void => {
        this.onlineUsers.delete(user.id);
    };

    setSocket = (socket: Socket | null): void => {
        this.socket = socket;
    };

    createNewConnection = async (): Promise<void> => {
        if (!this.socket) {
            this.setSocket(io('http://192.168.1.38:80'));
            await this.sendUserInfo();
            this.setupEventHandlers();
            this.getChats();
        }
    };

    disconnect = () => {
        if (!this.socket) {
            return;
        }
        this.socket.disconnect();
        this.setSocket(null);
        this.onlineUsers.clear();
    };

    readMessage = (messageId: string): void => {
        this.socket?.emit('readMessage', messageId);
    };

    sendMessage = (message: string, userId: string, isSmiling: boolean): void => {
        console.log(message, userId, isSmiling);
        this.socket?.emit('message', { text: message, isSmiling: isSmiling, toUserId: userId });
    };

    getChats = (): void => {
        this.socket?.emit('chats');
    };

    private sendUserInfo = async (): Promise<void> => {
        if (!this.socket) {
            return;
        }
        const userInfoJSON = await AsyncStorage.getItem('@profileInfo');
        const userInfo: UserInfo = userInfoJSON && JSON.parse(userInfoJSON);
        const onlineUserInfo: OnlineUser = { id: userInfo.id, login: userInfo.login };
        this.socket.emit('user', onlineUserInfo);
    };

    private setupEventHandlers = (): void => {
        if (!this.socket) {
            console.log('socket doesn\'t exists');
            return;
        }
        this.socket.on('userOnline', this.handleOtherUserConnection);
        this.socket.on('userOffline', this.handleOtherUserDisconnect);
        this.socket.on('chat', this.handleGetChat);
        this.socket.on('message', this.handleMessageReceive);
        this.socket.on('readMessage', this.handleReadMessage);
    };

    private handleOtherUserConnection = (user: OnlineUser): void => {
        this.addUser(user);
    };

    private handleOtherUserDisconnect = (user: OnlineUser): void => {
        this.removeUser(user);
    };

    private handleGetChat = (chat: ChatItem): void => {
        this.stores.chatsStore.addChat(chat);
    };

    private handleMessageReceive = (userId: string, message: MessageItem): void => {
        this.stores.chatsStore.receiveMessage(userId, message);
    };

    private handleReadMessage = (messageId: string, userId: string): void => {
        this.stores.chatsStore.handleReadMessage(messageId, userId);
    };
}