import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://192.168.1.38:4001';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use(async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    config.headers && accessToken && (config.headers.authorization = `Bearer ${accessToken}`);
    return config;
});

axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => response, (error: AxiosError) => {

    return Promise.reject(error.response?.data).catch();
});