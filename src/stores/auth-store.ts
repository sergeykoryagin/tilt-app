import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileInfo } from 'interfaces/model/profile-info';
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
            const { tokenPair, profileInfo } = await signIn(login, password);
            await this.setAuthData(tokenPair, profileInfo);
        } catch (error) {
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    };

    signUp = async (login: string, password: string): Promise<void> => {
        this.setIsLoading(true);
        try {
            const { tokenPair, profileInfo } = await signUp(login, password);
            await this.setAuthData(tokenPair, profileInfo);
        } catch (error) {
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    };

    authMe = async (): Promise<void> => {
        this.setIsLoading(true);
        try {
            const { tokenPair, profileInfo } = await authMe();
            await this.setAuthData(tokenPair, profileInfo);
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

    private setAuthData = async (tokenPair: TokenPair, profileInfo: ProfileInfo): Promise<void> => {
        await AsyncStorage.multiSet([
            ['@accessToken', tokenPair.accessToken],
            ['@refreshToken', tokenPair.refreshToken],
            ['@profileInfo', JSON.stringify(profileInfo)],
        ]);
        this.setMyProfileId(profileInfo.userId);
    };
}