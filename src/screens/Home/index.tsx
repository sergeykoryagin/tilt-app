import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Color } from 'constants/color';
import { MainStackParamList, ScreenName } from 'navigation/navigation';
import React, { FC, } from 'react';
import { View, StyleSheet } from 'react-native';
import { Fonts } from 'constants/fonts';

type Props = NativeStackScreenProps<MainStackParamList, ScreenName.HOME>;

export const Home: FC<Props> = (): JSX.Element => {
    return (
        <View style={styles.screen}>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        marginTop: 44,
    },
    title: {
        ...Fonts.header,
        marginBottom: 24,
    },
    login: {
        marginBottom: 20,
    },
    button: {
        marginVertical: 48,
    },
    linkWrapper: {
        alignItems: 'center',
    },
    noAccount: {
        ...Fonts.paragraphDefault,
        marginBottom: 4,
    },
    link: {
        ...Fonts.paragraphBold,
        color: Color.GREEN_400,
    },
});