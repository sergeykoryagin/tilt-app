import { useStores } from 'hooks/useStores';
import { useEffect } from 'react';

export const useProfileInfo = (userId?: string) => {
    const { profileStore: {
        userInfo,
        isLoading,
        isMyProfile,
        getUserInfo,
        isOnline,
        smileStatus,
    } } = useStores();


    useEffect(() => {
        userId && getUserInfo(userId);
    }, [userId]);

    return {
        profile: userInfo,
        isLoading,
        isMyProfile,
        isOnline,
        smileStatus
    };
};