import { useStores } from 'hooks/useStores';
import { useEffect } from 'react';

export const useProfileInfo = (userId: string) => {
    const { profileStore: { profileInfo, getProfileInfo, isLoading, isMyProfile, setProfileInfo } } = useStores();

    useEffect(() => {
        getProfileInfo(userId);
        return () => setProfileInfo(null);
    }, [userId]);

    return {
        profile: profileInfo,
        isLoading,
        isMyProfile
    };
};