import { MessageItem, message1, message2 } from 'interfaces/model/message-item';
import { profileInfo2, profileInfo3 } from 'interfaces/model/profile-info';

export interface ChatItem {
    chatId: string;
    userLogin: string;
    userId: string;
    lastMessage: MessageItem;
    userPhoto?: ArrayBuffer | string;
}

export const chatItem1: ChatItem = {
    chatId: 'awdiahwdi',
    userId: profileInfo2.userId,
    userLogin: profileInfo2.login,
    lastMessage: message1,
};

export const chatItem2: ChatItem = {
    chatId: 'awdnaw',
    userLogin: profileInfo3.login,
    userId: profileInfo3.userId,
    lastMessage: message2,
};