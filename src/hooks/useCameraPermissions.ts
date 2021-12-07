import { Camera } from 'expo-camera';
import { useEffect, useState } from 'react';

export const useCameraPermissions = () => {
    const [hasPermissions, setHasPermissions] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermissions(status === 'granted');
        })();
    }, []);

    return {
        hasPermissions
    };
};