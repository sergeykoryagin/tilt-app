import React, { FC, useState } from 'react';
import { Link } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Color } from 'constants/color';
import { useStores } from 'hooks/useStores';
import { AuthStackParamList, ScreenName } from 'navigation/navigation';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Fonts } from 'constants/fonts';

type Props = NativeStackScreenProps<AuthStackParamList, ScreenName.SIGN_UP>;

export const SignUp: FC<Props> = observer((): JSX.Element => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');

    const { authStore: { signUp, isLoading }, errorStore: { setError, error } } = useStores();

    const handleSignUpPress = () => {
        if (password !== passwordRepeat) {
            setError('Пароли не совпадают!');
            return;
        }
        if (login.length < 4) {
            setError('Минимальная длина имени пользователя - 4');
            return;
        }
        if (password.length < 4) {
            setError('Минимальная длина пароля - 4 символа');
            return;
        }
        signUp(login, password);
    };

    return (
        <KeyboardAvoidingView style={styles.screen}>
            <Text style={styles.title}>Регистрация</Text>
            <Input
                value={login}
                onChangeText={setLogin}
                placeholder='Имя пользователя'
                style={styles.input}
                editable={!isLoading}
                maxLength={20}
            />
            <Input
                value={password}
                onChangeText={setPassword}
                placeholder='Пароль'
                style={styles.input}
                editable={!isLoading}
                secureTextEntry
            />
            <Input
                value={passwordRepeat}
                onChangeText={setPasswordRepeat}
                placeholder='Повторите пароль'
                editable={!isLoading}
                secureTextEntry
            />
            <Button
                style={styles.button}
                onPress={handleSignUpPress}
                disabled={!!error || isLoading}
            >
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
});

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        paddingTop: 44,
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