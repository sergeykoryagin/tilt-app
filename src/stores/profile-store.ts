import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { SmileStatusEnum } from 'interfaces/model/smile-status-enum';
import { UserInfo } from 'interfaces/model/user-info';
import { makeAutoObservable } from 'mobx';
import { deleteAvatar, getProfileInfo, updateAvatar, updateProfile } from 'services/api/main.api';
import { Stores } from 'stores/stores';

export class ProfileStore {
    isLoading = false;
    userInfo: UserInfo | null = null;

    constructor(private stores: Stores) {
        makeAutoObservable(this);
    }

    setIsLoading = (isLoading: boolean): void => {
        this.isLoading = isLoading;
    };

    setUserInfo = (userInfo: UserInfo | null): void => {
        this.userInfo = userInfo;
    };

    get isProfileLoaded(): boolean {
        return !!this.userInfo;
    }

    get isMyProfile(): boolean {
        return this.isProfileLoaded && this.stores.authStore.isAuth &&
            this.userInfo?.id === this.stores.authStore.myProfileId;
    }

    get isOnline(): boolean {
        return !!this.userInfo && this.stores.socketConnectionStore.onlineUsers.has(this.userInfo.id);
    }

    get isSmiling(): boolean {
        const userInfo = this.userInfo && this.stores.socketConnectionStore.onlineUsers.get(this.userInfo.id);
        return !!userInfo?.isSmiling;
    }

    get isIncognito(): boolean {
        if (!this.userInfo){
            return true;
        }
        const userInfo = this.stores.socketConnectionStore.onlineUsers.get(this.userInfo.id);
        if (!userInfo) {
            return true;
        }
        return userInfo.isSmiling === undefined;
    }

    get smileStatus(): SmileStatusEnum {
        return this.isIncognito
            ? SmileStatusEnum.INCOGNITO
            : this.isSmiling
                ? SmileStatusEnum.SMILE
                : SmileStatusEnum.POKER_FACE;
    }

    getUserInfo = async (userId: string): Promise<void> => {
        this.setIsLoading(true);
        try {
            const { data: userInfo } = await getProfileInfo(userId);
            this.setUserInfo(userInfo);
        } catch (error) {
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    };

    updateAvatar = async (avatar: ImageInfo): Promise<void> => {
        this.isLoading = true;
        try {
            const file = {
                uri: avatar.uri,
                type: 'image/jpeg',
                name: 'avatar.jpeg'
            };
            // @ts-ignore
            const { data: userInfo } = await updateAvatar(file);
            await this.stores.authStore.setProfileInfo(userInfo);
            this.setUserInfo(userInfo);
        } catch (error) {
            console.log('sfnoiesfnsn');
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    };

    updateProfile = async (login: string, aboutMe?: string): Promise<void> => {
        this.isLoading = true;
        try {
            const { data: userInfo } = await updateProfile(login, aboutMe);
            await this.stores.authStore.setProfileInfo(userInfo);
            this.setUserInfo(userInfo);
        } catch (error) {
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    };

    deleteAvatar = async (): Promise<void> => {
        this.isLoading = true;
        try {
            await deleteAvatar();
            const userInfo: UserInfo | null = this.userInfo && {...this.userInfo, avatar: null};
            await this.stores.authStore.setProfileInfo(userInfo);
            this.setUserInfo(userInfo);
        } catch (error) {
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    };
}