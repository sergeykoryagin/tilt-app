import { Color } from 'constants/color';
import { StyleSheet } from 'react-native';

export enum InterFont {
    Inter_100Thin = 'Inter_100Thin',
    Inter_200ExtraLight = 'Inter_200ExtraLight',
    Inter_300Light = 'Inter_300Light',
    Inter_400Regular = 'Inter_400Regular',
    Inter_500Medium = 'Inter_500Medium',
    Inter_600SemiBold = 'Inter_600SemiBold',
    Inter_700Bold = 'Inter_700Bold',
    Inter_800ExtraBold = 'Inter_800ExtraBold',
    Inter_900Black = 'Inter_900Black',
}



export const Fonts = StyleSheet.create({
    header: {
        fontFamily: InterFont.Inter_300Light,
        fontSize: 48,
        lineHeight: 58,
        color: Color.BLACK_500,
    },
    usernameLarge: {
        fontFamily: InterFont.Inter_700Bold,
        fontSize: 36,
        lineHeight: 44,
        color: Color.BLACK_500,
    },
    input: {
        fontFamily: InterFont.Inter_500Medium,
        fontSize: 14,
        lineHeight: 17,
        color: Color.BLACK_500,
    },
    buttonDefault: {
        fontFamily: InterFont.Inter_600SemiBold,
        fontSize: 16,
        lineHeight: 19,
        color: Color.BLACK_500,
    },
    buttonDisabled: {
        fontFamily: InterFont.Inter_400Regular,
        fontSize: 16,
        lineHeight: 19,
        color: Color.BLACK_500,
    },
    usernameDefault: {
        fontFamily: InterFont.Inter_500Medium,
        fontSize: 18,
        lineHeight: 20,
        color: Color.BLACK_500,
    },
    usernameSmall: {
        fontFamily: InterFont.Inter_600SemiBold,
        fontSize: 14,
        lineHeight: 17,
        color: Color.BLACK_500,
    },
    messageDefault: {
        fontFamily: InterFont.Inter_500Medium,
        fontSize: 16,
        lineHeight: 19,
        color: Color.BLACK_500,
    },
    messageSmall: {
        fontFamily: InterFont.Inter_400Regular,
        fontSize: 14,
        lineHeight: 17,
        color: Color.BLACK_500,
    },
    messageSmallBold: {
        fontFamily: InterFont.Inter_600SemiBold,
        fontSize: 14,
        lineHeight: 17,
        color: Color.BLACK_500,
    },
    label: {
        fontFamily: InterFont.Inter_700Bold,
        fontSize: 14,
        lineHeight: 17,
        color: Color.BLACK_500,
    },
    paragraphSmall: {
        fontFamily: InterFont.Inter_500Medium,
        fontSize: 14,
        lineHeight: 17,
        color: Color.BLACK_500,
    },
    microText: {
        fontFamily: InterFont.Inter_500Medium,
        fontSize: 12,
        lineHeight: 15,
        color: Color.BLACK_500,
    },
    time: {
        fontFamily: InterFont.Inter_600SemiBold,
        fontSize: 12,
        lineHeight: 15,
        color: Color.BLACK_500,
    },
    paragraphDefault: {
        fontFamily: InterFont.Inter_400Regular,
        fontSize: 18,
        lineHeight: 22,
        color: Color.BLACK_500,
    },
    paragraphBold: {
        fontFamily: InterFont.Inter_600SemiBold,
        fontSize: 18,
        lineHeight: 22,
        color: Color.BLACK_500,
    },
});