import { useStores } from 'hooks/useStores';
import { throttle } from 'lodash';
import { useCallback, useEffect } from 'react';

export const useSearchUsers = (isUserSegmentOpened: boolean) => {
    const { searchStore: { searchTerm, setSearchTerm, searchUsers, loadMoreUsers, users, isLoading } } = useStores();

    const throttledSearchUsers = useCallback( throttle(() => {
        searchUsers();
    }, 300, { leading: true }), []);

    useEffect(() => {
        isUserSegmentOpened && throttledSearchUsers();
    }, [searchTerm, isUserSegmentOpened]);


    return {
        searchTerm,
        setSearchTerm,
        users,
        loadMoreUsers,
        isLoading,
    };
};