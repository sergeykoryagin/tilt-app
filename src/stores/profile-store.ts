import { makeAutoObservable } from 'mobx';
import { ProfileInfo } from 'interfaces/model/profile-info';
import { getProfileInfo } from 'services/api/main.api';
import { Stores } from 'stores/stores';

export class ProfileStore {
    isLoading = false;
    profileInfo: ProfileInfo | null = null;

    constructor(private stores: Stores) {
        makeAutoObservable(this);
    }

    setIsLoading = (isLoading: boolean): void => {
        this.isLoading = isLoading;
    };

    setProfileInfo = (profileInfo: ProfileInfo | null): void => {
        this.profileInfo = profileInfo;
    };

    get isProfileLoaded() {
        return !!this.profileInfo;
    }

    get isMyProfile() {
        return this.isProfileLoaded && this.stores.authStore.isAuth &&
            this.profileInfo?.userId === this.stores.authStore.myProfileId;
    }

    getProfileInfo = async (userId: string): Promise<void> => {
        this.setIsLoading(true);
        try {
            const profileInfo = await getProfileInfo(userId);
            this.setProfileInfo(profileInfo || null);
        } catch (error) {
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    };
}