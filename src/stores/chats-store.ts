import { ChatItem } from 'interfaces/model/chat-item';
import { makeAutoObservable, runInAction, when } from 'mobx';
import { MessageItem } from 'interfaces/model/message-item';
import { Stores } from 'stores/stores';
import parseISO from 'date-fns/parseISO';

export class ChatsStore {
    isLoading = false;
    chats: Map<ChatItem['userId'], MessageItem[]> = new Map<ChatItem['userId'], MessageItem[]>();

    constructor(private stores: Stores) {
        makeAutoObservable(this);
        when(() => !this.stores.authStore.isAuth, () => {
            this.chats.clear();
        });
    }

    get orderedChats (){
        return [...this.chats.entries()].map((chat) => {
            const userId = chat[0];
            const orderedMessages = chat[1].slice().sort((m1, m2) => {
                if (!m1 || !m2) {
                    return 0;
                }
                return parseISO(m2.createdAt).getTime() - parseISO(m1.createdAt).getTime();
            });
            const lastMessage = orderedMessages[0];
            return {
                userId,
                lastMessage
            };
        }).sort((chat1, chat2) => {
            if (!chat1?.lastMessage || !chat2?.lastMessage) {
                return 0;
            }
            return parseISO(chat2.lastMessage.createdAt).getTime() - parseISO(chat1.lastMessage.createdAt).getTime();
        });
    }

    getCurrentChatMessages = (userId: string): MessageItem[] | undefined => {
        const messages = this.chats.get(userId);
        return messages && [...messages]?.sort((m1, m2) => {
            return parseISO(m2.createdAt).getTime() - parseISO(m1.createdAt).getTime();
        });
    };

    setIsLoading = (isLoading: boolean): void => {
        this.isLoading = isLoading;
    };

    setMessages = (chatId: string, messages: MessageItem[]): void => {
        const chatMessages = this.chats.get(chatId);
        if (!chatMessages) {
            this.chats.set(chatId, messages);
        }
        chatMessages?.push(...messages);
    };

    sendMessage = (message: string, userId: string, isSmiling: boolean): void => {
        this.stores.socketConnectionStore.sendMessage(message, userId, isSmiling);
    };

    addChat = (chat: ChatItem): void => {
        this.chats.set(chat.userId, chat.messages);
    };

    receiveMessage = (userId: string, message: MessageItem): void => {
        const messages = this.chats.get(userId);
        runInAction(() => this.chats.set(userId, messages ? [...messages, message] : [message]));
    };

    readMessage = (messageId: string): void => {
        this.stores.socketConnectionStore.readMessage(messageId);
    };

    handleReadMessage = (messageId: string, userId: string): void => {
        const chatMessages = this.chats.get(userId);
        if (!chatMessages) {
            return;
        }
        this.chats?.set(userId, chatMessages.map((chatMessage: MessageItem) => {
            if (messageId === chatMessage.id) {
                return {
                    ...chatMessage,
                    isRead: true,
                };
            }
            return chatMessage;
        }));
    };
}