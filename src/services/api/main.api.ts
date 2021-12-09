import axios, { Axios, AxiosPromise } from 'axios';
import { DataSendPermissionsInfo } from 'interfaces/model/data-send-permissions-info';
import { UserInfo } from 'interfaces/model/user-info';
import { Pagination } from 'interfaces/pagination';

export const getProfileInfo = (userId: string): AxiosPromise<UserInfo> =>
    axios.get(`/users?userId=${userId}`);

export const searchUsers = (searchString: string, { pageSize, pageNumber }: Pagination): AxiosPromise<UserInfo[]> =>
    axios.get(`/users/search?searchString=${searchString}&pageNumber=${pageNumber}&pageSize=${pageSize}`);

export const updateAvatar = (avatar: Blob): AxiosPromise<UserInfo> => {
    const formData = new FormData();
    formData.append('avatar', avatar, 'avatar.jpeg');
    return axios.put('/users/avatar', formData);
};

export const deleteAvatar = (): AxiosPromise<UserInfo> =>
    axios.delete('/users/avatar');

export const updateProfile = (login: string, aboutMe: string): AxiosPromise<UserInfo> =>
    axios.put('/users', { login, aboutMe });

export const getDataSendPermissionsInfo = (): AxiosPromise<DataSendPermissionsInfo> =>
    axios.get('/users/permissions');

export const updateDataSendPermissionsInfo = (
    dataSendPermissionsInfo: DataSendPermissionsInfo
): AxiosPromise<DataSendPermissionsInfo> =>
    axios.put('/users/permissions', dataSendPermissionsInfo);