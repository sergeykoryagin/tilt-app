import { UserInfo } from 'interfaces/model/user-info';
import { Pagination } from 'interfaces/pagination';
import { makeAutoObservable } from 'mobx';
import { searchUsers } from 'services/api/main.api';
import { Stores } from 'stores/stores';

const defaultSearchUsersPagination: Pagination = {
    pageNumber: 1,
    pageSize: 10,
};

export class SearchStore {
    isLoading = false;
    searchTerm = '';
    currentPageNumber = 0;
    users: UserInfo[] = [];

    constructor(private stores: Stores) {
        makeAutoObservable(this);
    }

    setIsLoading = (isLoading: boolean): void => {
        this.isLoading = isLoading;
    };

    setSearchTerm = (searchTerm: string): void => {
        this.searchTerm = searchTerm;
    };

    setUsers = (users: UserInfo[]): void => {
        this.users = users;
    };

    setCurrentPageNumber = (pageNumber: number): void => {
        this.currentPageNumber = pageNumber;
    };

    addUsers = (users: UserInfo[]): void => {
        this.setUsers([...this.users, ...users]);
    };

    searchUsers = async (): Promise<void> => {
        if (this.searchTerm === '') {
            this.setUsers([]);
            return;
        }
        this.setIsLoading(true);
        try {
            const { data: users } = await searchUsers(this.searchTerm, defaultSearchUsersPagination);
            this.setCurrentPageNumber(1);
            this.setUsers(users);
        } catch (error) {
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    };

    loadMoreUsers = async (): Promise<void> => {
        this.setIsLoading(true);
        try {
            const { data: users } = await searchUsers(this.searchTerm, { pageSize: 10, pageNumber: this.currentPageNumber + 1 });
            if (users.length !== 0) {
                this.setCurrentPageNumber(this.currentPageNumber + 1);
                this.addUsers(users);
            }
        } catch (error) {
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    };

}