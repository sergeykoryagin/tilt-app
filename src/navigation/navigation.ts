import { createNativeStackNavigator } from '@react-navigation/native-stack';

export enum ScreenName {
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP',
    HOME = 'HOME',
    PROFILE = 'PROFILE',
    CHAT = 'CHAT',
    SETTINGS = 'SETTINGS',
}

export type AuthStackParamList = {
    [ScreenName.SIGN_IN]: undefined;
    [ScreenName.SIGN_UP]: undefined;
};
export const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export type MainStackParamList = {
    [ScreenName.HOME]: undefined;
    [ScreenName.PROFILE]: { userId: string; };
    [ScreenName.CHAT]: { userId: string };
    [ScreenName.SETTINGS]: undefined;
};
export const MainStack = createNativeStackNavigator<MainStackParamList>();

