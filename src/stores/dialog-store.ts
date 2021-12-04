import { makeAutoObservable } from 'mobx';
import { MessageItem } from 'interfaces/model/message-item';
import { Stores } from 'stores/stores';

export class DialogStore {
    isLoading = false;
    messages: MessageItem[] = [];

    constructor(private stores: Stores) {
        makeAutoObservable(this);
    }

    setIsLoading = (isLoading: boolean): void => {
        this.isLoading = isLoading;
    };

    setMessages = (messages: MessageItem[]): void => {
        this.messages = messages;
    };

    addMessages = (messages: MessageItem[]): void => {
        this.setMessages([...this.messages, ...messages]);
    };

    clearMessages = (): void => {
        this.setMessages([]);
    };
}