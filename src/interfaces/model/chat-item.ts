import { MessageItem } from 'interfaces/model/message-item';

export interface ChatItem {
    userId: string;
    messages: MessageItem[];
}