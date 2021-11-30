import { Fonts } from 'constants/fonts';
import { Input } from 'components/Input';
import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SignIn: FC = (): JSX.Element => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Вход</Text>
            <Input value='kek' />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    title: {
        ...Fonts.header,
        marginTop: 96,
    }
});