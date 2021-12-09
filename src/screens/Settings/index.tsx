import { Link } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from 'components/Button';
import { Fonts } from 'constants/fonts';
import { useStores } from 'hooks/useStores';
import { observer } from 'mobx-react-lite';
import { MainStackParamList, ScreenName } from 'navigation/navigation';
import React, { FC } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Color } from 'constants/color';
import ArrowLeftIcon from 'svg-icons/arrow-left.svg';

type Props = NativeStackScreenProps<MainStackParamList, ScreenName.CHAT>;

export const Settings: FC<Props> = observer(({ navigation }: Props): JSX.Element => {
    const {
        permissionsStore: {
            hasDataSendPermissions,
            updateDataSendPermissionsInfo
        },
        authStore: {
            signOut
        }
    } = useStores();

    const handleBackButtonPress = () => {
        navigation.goBack();
    };

    const handleChangePasswordPress = () => {
        navigation.navigate(ScreenName.PASSWORD_CHANGE);
    };

    return (
        <View style={styles.screen}>
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
                <Text style={styles.title}>Настройки</Text>
            </View>
            <View style={styles.buttons}>
                <Button
                    style={styles.changePassword}
                    onPress={handleChangePasswordPress}
                >
                    Сменить пароль
                </Button>
                <View style={styles.smileTrackInfo}>
                    <Text style={styles.smileTrackText}>Отправлять данные о настроении собеседнику:</Text>
                    <Switch
                        trackColor={{false: Color.BLACK_100, true: Color.GREEN_200}}
                        thumbColor={Color.WHITE}
                        style={styles.smileTrack}
                        value={hasDataSendPermissions}
                        onValueChange={updateDataSendPermissionsInfo}
                    />
                </View>
            </View>
            <Button
                style={styles.logout}
                onPress={signOut}
            >
                Выйти из аккаунта
            </Button>
        </View>
    );
});

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: Color.WHITE,
        position: 'relative'
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
        ...Fonts.header
    },
    buttons: {
        flexGrow: 1,
        alignItems: 'center',
    },
    changePassword: {
        marginBottom: 48,
    },
    smileTrackInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        maxWidth: 327,
    },
    smileTrackText: {
        ...Fonts.label,
        maxWidth: 200,
        marginRight: 12,
    },
    smileTrack: {

    },
    logout: {
        marginBottom: 96,
    },
});