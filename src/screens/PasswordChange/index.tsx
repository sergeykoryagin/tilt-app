import React, { FC, useState } from 'react';
import { Link } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Color } from 'constants/color';
import { useStores } from 'hooks/useStores';
import { AuthStackParamList, MainStackParamList, ScreenName } from 'navigation/navigation';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Fonts } from 'constants/fonts';
import ArrowLeftIcon from 'svg-icons/arrow-left.svg';

type Props = NativeStackScreenProps<MainStackParamList, ScreenName.PASSWORD_CHANGE>;

export const PasswordChange: FC<Props> = observer(({ navigation }): JSX.Element => {
    const [password, setPassword] = useState<string>('');
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');

    const { authStore: { updatePassword, isLoading }, errorStore: { setError, error } } = useStores();

    const handleSignUpPress = async () => {
        if (password !== passwordRepeat) {
            setError('Пароли не совпадают!');
            return;
        }
        if (password.length < 4) {
            setError('Минимальная длина пароля - 4 символа');
            return;
        }
        await updatePassword(password);
        navigation.goBack();
    };

    const handleBackButtonPress = () => {
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={handleBackButtonPress}
                >
                    <ArrowLeftIcon
                        width={48}
                        height={48}
                        fill={Color.BLACK_400}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Обновление пароля</Text>
            </View>
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
                Сохранить
            </Button>
        </KeyboardAvoidingView>
    );
});

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: Color.WHITE,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 327,
        marginTop: 44,
        marginBottom: 48,
    },
    title: {
        ...Fonts.header,
    },
    input: {
        marginBottom: 20,
    },
    button: {
        marginVertical: 48,
    },
});