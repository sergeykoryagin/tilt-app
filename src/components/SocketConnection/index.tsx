import { useStores } from 'hooks/useStores';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';

export const SocketConnection: FC = observer((): JSX.Element => {
    const { socketConnectionStore: { createNewConnection, disconnect }, authStore: { isAuth } } = useStores();

    useEffect(() => {
        if (isAuth) {
            createNewConnection();
        } else {
            disconnect();
        }
    }, [isAuth]);

    return <></>;
});