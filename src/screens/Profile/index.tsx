import { DefaultAvatar } from 'components/DefaultAvatar';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from 'components/Button';
import { Color } from 'constants/color';
import { Fonts } from 'constants/fonts';
import { MainStackParamList, ScreenName } from 'navigation/navigation';
import { useProfileInfo } from 'screens/Profile/hooks/useProfileInfo';
import ArrowLeftIcon from 'svg-icons/arrow-left.svg';
import { formatISOstring } from 'utils/formatISOstring';

type Props = NativeStackScreenProps<MainStackParamList, ScreenName.PROFILE>;

export const Profile: FC<Props> = observer(({ navigation, route }: Props): JSX.Element => {
    const { width } = useWindowDimensions();

    const handleBackButtonPress = () => {
        navigation.goBack();
    };

    const { profile, isMyProfile, isOnline } = useProfileInfo(route.params.userId);

    const handleSendMessagePress = () => {
        navigation.navigate(ScreenName.CHAT, { userId: route.params.userId });
    };

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={handleBackButtonPress}
                    activeOpacity={0.6}
                >
                    <ArrowLeftIcon fill={Color.WHITE} width={48} height={48} style={styles.backButton} />
                </TouchableOpacity>
                {!isMyProfile && (
                    <Text style={styles.onlineStatus}>
                        {isOnline
                            ? 'В сети'
                            : `был(а) в сети ${profile?.wasOnline && formatISOstring(profile.wasOnline)}`}
                    </Text>
                )}
            </View>
            <Image
                source={require('assets/images/gradient.png')}
                style={{
                    ...styles.gradient,
                    height: width,
                    width,
                }}
            />
            {profile?.avatar ? (
                <Image
                    source={{uri: profile?.avatar}}
                    style={{
                        ...styles.avatar,
                        height: width,
                        width,
                    }}
                />
            ) : (
                <DefaultAvatar width={width} height={width} />
            )}
            <View style={styles.info}>
                <Text style={styles.field}>Имя пользователя</Text>
                <Text style={styles.login}>{profile?.login}</Text>
                <Text style={styles.field}>Обо мне:</Text>
                <Text style={styles.aboutMe}>{profile?.aboutMe}</Text>
            </View>
            {isMyProfile ? (
                <Button>
                    Редактировать профиль
                </Button>
            ) : (
                <Button onPress={handleSendMessagePress}>
                    Написать сообщение
                </Button>
            )}
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
        position: 'absolute',
        top: 44,
        left: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: 327,
        zIndex: 2,
    },
    backButton: {
        borderRadius: 16,
        borderWidth: 2,
        borderColor: Color.WHITE,
    },
    onlineStatus: {
        ...Fonts.label,
        color: Color.WHITE,
    },
    gradient: {
        position: 'absolute',
        zIndex: 1,
    },
    avatar: {

    },
    info: {
        width: '100%',
        maxWidth: 327,
        paddingTop: 36,
        marginBottom: 48,
    },
    field: {
        ...Fonts.label,
        color: Color.BLACK_300,
        marginBottom: 8,
    },
    login: {
        ...Fonts.usernameLarge,
        marginBottom: 24,
    },
    aboutMe: {
        ...Fonts.paragraphDefault,
    },
});