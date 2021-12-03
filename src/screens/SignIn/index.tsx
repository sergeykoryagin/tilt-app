import React, { FC, useState } from 'react';
import { Link } from '@react-navigation/native';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Color } from 'constants/color';
import { AuthStackParamList, ScreenName } from 'navigation/navigation';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Fonts } from 'constants/fonts';

type Props = NativeStackScreenProps<AuthStackParamList, ScreenName.SIGN_IN>;

export const SignIn: FC<Props> = (): JSX.Element => {
    const [login, setLogin] = useState<string>('1231231');
    const [password, setPassword] = useState<string>('');

    return (
        <KeyboardAvoidingView style={{
            ...styles.screen,
        }} behavior='height'>
            <Text style={styles.title}>Вход</Text>
            <Input
                value={login}
                onChangeText={setLogin}
                placeholder='Имя пользователя'
                style={styles.login}
            />
            <Input
                value={password}
                onChangeText={setPassword}
                placeholder='Пароль'
                secureTextEntry
            />
            <Button style={styles.button}>
                 Войти
            </Button>
            <View style={styles.linkWrapper}>
                <Text style={styles.noAccount}>
                    нет аккаунта?
                </Text>
                <Link<AuthStackParamList> to={{ screen: ScreenName.SIGN_UP }} style={styles.link}>
                    зарегистрироваться
                </Link>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        paddingTop: 44,
        width: '100%',
        backgroundColor: Color.WHITE,
        alignItems: 'center',
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