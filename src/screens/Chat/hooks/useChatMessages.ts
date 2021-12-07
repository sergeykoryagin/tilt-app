import { useStores } from 'hooks/useStores';
import { useCallback, useMemo, useState } from 'react';

export const useChatMessages = (userId: string) => {
    const [messageText, setMessageText] = useState<string>('');

    const { chatsStore: {
        getCurrentChatMessages,
        sendMessage,
        chats
    } } = useStores();

    const messages = useMemo(() => {
        return getCurrentChatMessages(userId);
    }, [userId, chats.get(userId)]);

    const handleSendMessage = useCallback((isSmiling) => {
        messageText && sendMessage(messageText, userId, isSmiling);
        setMessageText('');
    }, [userId, messageText]);


    return {
        messageText,
        messages,
        handleSendMessage,
        handleMessageTextChange: setMessageText,
    };
};