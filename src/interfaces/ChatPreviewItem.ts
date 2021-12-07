import { MessageItem } from 'interfaces/model/message-item';

export interface ChatPreviewItem {
    userId: string;
    lastMessage: MessageItem;
}