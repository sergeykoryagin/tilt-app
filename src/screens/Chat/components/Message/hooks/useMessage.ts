import { useStores } from 'hooks/useStores';
import { MessageItem } from 'interfaces/model/message-item';
import { useEffect, useMemo } from 'react';

export const useMessage = (message: MessageItem) => {
    const { authStore: { myProfileId } } = useStores();
    const isMineMessage = useMemo(() => myProfileId === message.userId,
        [message, myProfileId]
    );

    const { chatsStore: { readMessage } } = useStores();
    useEffect(() => {
        !isMineMessage && !message.isRead && readMessage(message.id);
    }, [message, isMineMessage]);

    return {
        isMineMessage,
    };
};