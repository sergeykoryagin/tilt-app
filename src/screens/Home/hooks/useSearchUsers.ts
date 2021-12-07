import { useStores } from 'hooks/useStores';
import { useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';

export const useSearchUsers = (isUserSegmentOpened: boolean) => {
    const { searchStore: { searchTerm, setSearchTerm, searchUsers, loadMoreUsers, users } } = useStores();

    const debouncedSearchUsers = useCallback( debounce(() => searchUsers(), 500), []);

    useEffect(() => {
        isUserSegmentOpened && debouncedSearchUsers();
    }, [searchTerm, isUserSegmentOpened]);

    return {
        searchTerm,
        setSearchTerm,
        users,
        loadMoreUsers,
    };
};