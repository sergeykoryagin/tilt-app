import { ProfileInfo } from 'interfaces/model/profile-info';
import profiles from 'utils/mocks/profiles.json';

export const getProfileInfo = async (userId: string): Promise<ProfileInfo | undefined> => {
    // @ts-ignore
    return profiles.find((profile: ProfileInfo) => {
        return profile.userId === userId;
    });
};