import { profileInfo1, profileInfo3 } from 'interfaces/model/profile-info';

export interface MessageItem {
    messageId: string;
    text: string;
    isRead: boolean;
    createdAt: string;
    createdBy: string;
    isUserSmiled: boolean;
}

export const message1: MessageItem = {
    messageId: 'wdawdadw',
    text: 'решаем пчисленные методы  diidwihdi w dwi dhw idi  ',
    isRead: false,
    createdAt: '9:49',
    createdBy: profileInfo1.userId,
    isUserSmiled: false,
};
export const message2: MessageItem = {
    messageId: 'wdawd1231231w',
    text: 'ахахаха',
    isRead: true,
    createdAt: '21:21',
    createdBy: profileInfo3.userId,
    isUserSmiled: true,
};
