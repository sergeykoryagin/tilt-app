import { ChatItem } from 'interfaces/model/chat-item';
import { makeAutoObservable } from 'mobx';
import { Stores } from 'stores/stores';

export class ChatsStore {
    isLoading = false;
    chats: ChatItem[] = [];

    constructor(private stores: Stores) {
        makeAutoObservable(this);
    }

    setIsLoading = (isLoading: boolean): void => {
        this.isLoading = isLoading;
    };

    setChats = (chats: ChatItem[]): void => {
        this.chats = chats;
    };

    addChats = (chats: ChatItem[]): void => {
        this.setChats([...this.chats, ...chats]);
    };

    clearChats = (): void => {
        this.setChats([]);
    };
}