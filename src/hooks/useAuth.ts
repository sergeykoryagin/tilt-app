import { useEffect } from 'react';
import { useStores } from 'hooks/useStores';

export const useAuth = () => {
    const { authStore: { authMe, isAuth } } = useStores();
    useEffect(() => {
        authMe();
    }, []);
    return {
        isAuth
    };
};