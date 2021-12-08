import { useImagePick } from 'hooks/useImagePick';
import { useStores } from 'hooks/useStores';
import { useCallback } from 'react';

export const useAvatarChange = () => {
    const { profileStore: { updateAvatar, deleteAvatar } } = useStores();
    const { handlePickImage } = useImagePick();

    const handleAvatarChange = useCallback(async () => {
        await handlePickImage(updateAvatar);
    }, []);

    return {
        handleAvatarChange,
        deleteAvatar,
    };
};