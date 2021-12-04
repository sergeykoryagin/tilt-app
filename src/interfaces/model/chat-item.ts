import { MessageItem } from 'interfaces/model/message-item';
import { ProfileInfo } from 'interfaces/model/profile-info';
import profiles from 'utils/mocks/profiles.json';
import messages from 'utils/mocks/messages.json';

// @ts-ignore
const profile: ProfileInfo = profiles[0];
const message: MessageItem = messages[0];

export interface ChatItem {
    chatId: string;
    userLogin: string;
    userId: string;
    lastMessage: MessageItem;
    userPhoto?: ArrayBuffer | string;
}

export const chatItems: ChatItem[] = [
    {
        chatId: 'awdiahwdi',
        userId: profile.userId,
        userLogin: profile.login,
        lastMessage: message,
    },
    {
        chatId: 'awdnaw',
        userLogin: profile.login,
        userId: profile.userId,
        lastMessage: message,
    },
    {
        chatId: 'wfvaw',
        userId: profile.userId,
        userLogin: profile.login,
        lastMessage: message,
    },
    {
        chatId: 'awd12ewrfdnaw',
        userLogin: profile.login,
        userId: profile.userId,
        lastMessage: message,
    },
    {
        chatId: 'awd3refsiahwdi',
        userId: profile.userId,
        userLogin: profile.login,
        lastMessage: message,
    },
    {
        chatId: 'aw3rqwaefsgrhdnaw',
        userLogin: profile.login,
        userId: profile.userId,
        lastMessage: message,
    },
    {
        chatId: 'awd12ewafwfarfdnaw',
        userLogin: profile.login,
        userId: profile.userId,
        lastMessage: message,
    },
    {
        chatId: 'awd3refsidnybdahwdi',
        userId: profile.userId,
        userLogin: profile.login,
        lastMessage: message,
    },
    {
        chatId: 'aw3rqwae456yuhgffsgrhdnaw',
        userLogin: profile.login,
        userId: profile.userId,
        lastMessage: message,
    },

];