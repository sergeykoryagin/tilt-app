import axios, { AxiosPromise } from 'axios';
import { AuthResponse } from 'interfaces/model/auth-response';

export const signIn = (login: string, password: string): AxiosPromise<AuthResponse> =>
    axios.post('/auth/sign-in', { login, password });

export const signUp = (login: string, password: string): AxiosPromise<AuthResponse> =>
    axios.post('/auth/sign-up', { login, password });

export const authMe = (refreshToken: string): AxiosPromise<AuthResponse> =>
    axios.post('/auth/auth-me', { refreshToken });

export const signOut = (): AxiosPromise<void> =>
    axios.delete('/auth/sign-out');

export const updatePassword = (password: string): AxiosPromise<void> => {
    return axios.put('/auth/password', { password });
};
