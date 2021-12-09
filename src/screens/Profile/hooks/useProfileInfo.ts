import { useStores } from 'hooks/useStores';
import { useCallback, useEffect, useMemo } from 'react';

export const useProfileInfo = (userId?: string) => {
    const {
        profileStore: {
            userInfo,
            isLoading,
            getUserInfo,
            setUserInfo,
            isOnline,
            smileStatus,
        },
        authStore: {
            myProfileId
        },
    } = useStores();

    useEffect(() => {
        userId && getUserInfo(userId);
        return () => {
            userId && setUserInfo(null);
        };
    }, [userId]);

    const handleRefreshProfile = useCallback(() => {
        userId && getUserInfo(userId);
    }, [userId]);

    const isMyProfile = useMemo(() => myProfileId === userId, [userId]);

    return {
        profile: userInfo,
        isLoading,
        isMyProfile,
        isOnline,
        smileStatus,
        handleRefreshProfile,
        getUserInfo,
    };
};