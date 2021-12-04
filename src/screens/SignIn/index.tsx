import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';
import { Link } from '@react-navigation/native';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useStores } from 'hooks/useStores';
import { Color } from 'constants/color';
import { AuthStackParamList, ScreenName } from 'navigation/navigation';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Fonts } from 'constants/fonts';

type Props = NativeStackScreenProps<AuthStackParamList, ScreenName.SIGN_IN>;

export const SignIn: FC<Props> = observer((): JSX.Element => {
    const { authStore: { isLoading, signIn } } = useStores();

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignInPress = () => {
        signIn(login, password);
    };

    return (
        <KeyboardAvoidingView style={{
            ...styles.screen,
        }} behavior='height'>
            <Text style={styles.title}>Вход</Text>
            <Input
                value={login}
                onChangeText={setLogin}
                placeholder='Имя пользователя'
                editable={!isLoading}
                style={styles.login}
            />
            <Input
                value={password}
                onChangeText={setPassword}
                placeholder='Пароль'
                editable={!isLoading}
                secureTextEntry
            />
            <Button
                style={styles.button}
                onPress={handleSignInPress}
                disabled={isLoading}
            >
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
});

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