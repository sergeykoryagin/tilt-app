import { AuthResponse } from 'interfaces/model/auth-response';
import { ProfileInfo } from 'interfaces/model/profile-info';
import profiles from 'utils/mocks/profiles.json';

// @ts-ignore
const profile: ProfileInfo = profiles[0];

export const signIn = async (login: string, password: string): Promise<AuthResponse> => {
    return new Promise((resolve) => setTimeout(() => resolve({
        tokenPair: {
            accessToken: login,
            refreshToken: 'kek',
        },
        profileInfo: profile,
    }), 500));
};

export const signUp = async (login: string, password: string): Promise<AuthResponse> => {
    return new Promise((resolve) => setTimeout(() => resolve({
        tokenPair: {
            accessToken: login,
            refreshToken: 'kek',
        },
        profileInfo: profile,
    }), 500));
};

export const authMe = async (): Promise<AuthResponse> => {
    return new Promise((resolve) => setTimeout(() => resolve({
        tokenPair: {
            accessToken: 'ssoenfsfo',
            refreshToken: 'kek',
        },
        profileInfo: profile,
    }), 500));
};

export const signOut = async (): Promise<void> => {

};
