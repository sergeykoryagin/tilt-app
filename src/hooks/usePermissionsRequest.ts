import { Camera } from 'expo-camera';
import { useStores } from 'hooks/useStores';
import { useEffect } from 'react';

export const usePermissionsRequest = () => {
    const {
        permissionsStore: {
            setHasCameraPermissions,
            getDataSendPermissionsInfo,
        },
        errorStore: {
            setError,
        },
    } = useStores();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                setError('Без разрешения на камеру не получится поделиться с собеседником настроением)))');
            }
            setHasCameraPermissions(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        getDataSendPermissionsInfo();
    }, []);
};