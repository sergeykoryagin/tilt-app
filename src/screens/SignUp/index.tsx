import { Link } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Color } from 'constants/color';
import { AuthStackParamList, ScreenName } from 'navigation/navigation';
import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Fonts } from 'constants/fonts';

type Props = NativeStackScreenProps<AuthStackParamList, ScreenName.SIGN_UP>;

export const SignUp: FC<Props> = (): JSX.Element => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');

    return (
        <KeyboardAvoidingView style={styles.screen} behavior='padding'>
            <Text style={styles.title}>Регистрация</Text>
            <Input
                value={login}
                onChangeText={setLogin}
                placeholder='Имя пользователя'
                style={styles.input}
            />
            <Input
                value={password}
                onChangeText={setPassword}
                placeholder='Пароль'
                style={styles.input}
                secureTextEntry
            />
            <Input
                value={passwordRepeat}
                onChangeText={setPasswordRepeat}
                placeholder='Повторите пароль'
                secureTextEntry
            />
            <Button style={styles.button}>
                Зарегистрироваться
            </Button>
            <View style={styles.linkWrapper}>
                <Text style={styles.hasAccount}>
                    есть аккаунт?
                </Text>
                <Link<AuthStackParamList> to={{ screen: ScreenName.SIGN_IN }} style={styles.link}>
                    авторизоваться
                </Link>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        marginTop: 44,
        backgroundColor: Color.WHITE,
    },
    title: {
        ...Fonts.header,
        marginBottom: 24,
    },
    input: {
        marginBottom: 20,
    },
    button: {
        marginVertical: 48,
    },
    linkWrapper: {
        alignItems: 'center',
    },
    hasAccount: {
        ...Fonts.paragraphDefault,
        marginBottom: 4,
    },
    link: {
        ...Fonts.paragraphBold,
        color: Color.GREEN_400,
    },
});