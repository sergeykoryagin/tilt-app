import axios, { AxiosPromise } from 'axios';
import { UserInfo } from 'interfaces/model/user-info';
import { Pagination } from 'interfaces/pagination';

export const getProfileInfo = (userId: string): AxiosPromise<UserInfo> =>
    axios.get(`/users?userId=${userId}`);

export const searchUsers = (searchString: string, { pageSize, pageNumber }: Pagination): AxiosPromise<UserInfo[]> =>
    axios.get(`/users/search?searchString=${searchString}&pageNumber=${pageNumber}&pageSize=${pageSize}`);