import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInfo } from 'interfaces/model/user-info';
import { TokenPair } from 'interfaces/model/token-pair';
import { authMe, signIn, signOut, signUp } from 'services/api/auth.api';
import { Stores } from 'stores/stores';

export class AuthStore {
    isLoading = false;
    myProfileId: string | null = null;

    constructor(private stores: Stores) {
        makeAutoObservable(this);
    }

    get isAuth() {
        return !!this.myProfileId;
    }

    setIsLoading = (isLoading: boolean): void => {
        this.isLoading = isLoading;
    };

    setMyProfileId = (myProfileId: string | null): void => {
        this.myProfileId = myProfileId;
    };

    signIn = async (login: string, password: string): Promise<void> => {
        this.setIsLoading(true);
        try {
            const { data: { tokenPair, userInfo } } = await signIn(login, password);
            await this.setAuthData(tokenPair, userInfo);
        } catch (error) {
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    };

    signUp = async (login: string, password: string): Promise<void> => {
        this.setIsLoading(true);
        try {
            const { data: { tokenPair, userInfo } } = await signUp(login, password);
            await this.setAuthData(tokenPair, userInfo);
        } catch (error) {
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    };

    authMe = async (): Promise<void> => {
        this.setIsLoading(true);
        try {
            const refreshToken = await AsyncStorage.getItem('@refreshToken');
            if (!refreshToken) {
                return;
            }
            const { data: { tokenPair, userInfo } } = await authMe(refreshToken);
            await this.setAuthData(tokenPair, userInfo);
        } catch (error) {
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    };

    signOut = async (): Promise<void> => {
        this.setIsLoading(true);
        try {
            await signOut();
            await AsyncStorage.multiRemove(['@accessToken', '@refreshToken', '@profileInfo']);
            this.setMyProfileId(null);
        } catch (error) {
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    };

    setAuthData = async (tokenPair: TokenPair, profileInfo: UserInfo): Promise<void> => {
        await AsyncStorage.multiSet([
            ['@accessToken', tokenPair.accessToken],
            ['@refreshToken', tokenPair.refreshToken],
            ['@profileInfo', JSON.stringify(profileInfo)],
        ]);
        this.setMyProfileId(profileInfo.id);
    };
}