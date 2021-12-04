import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from 'components/Button';
import { Color } from 'constants/color';
import { Fonts } from 'constants/fonts';
import { profileInfo1 } from 'interfaces/model/profile-info';
import { MainStackParamList, ScreenName } from 'navigation/navigation';
import ArrowLeftIcon from 'svg-icons/arrow-left.svg';

type Props = NativeStackScreenProps<MainStackParamList, ScreenName.HOME>;

export const Profile: FC<Props> = ({ navigation }: Props): JSX.Element => {
    const { width } = useWindowDimensions();

    const handleBackButtonPress = () => {
        navigation.goBack();
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
                {/*<Text style={styles.onlineStatus}>*/}
                {/*    был в сети в 21:21*/}
                {/*</Text>*/}
            </View>
            <Image
                source={require('assets/images/gradient.png')}
                style={{
                    ...styles.gradient,
                    height: width,
                    width,
                }}
            />
            <Image
                source={require('assets/images/avatar-doge-large.png')}
                style={{
                    ...styles.avatar,
                    height: width,
                    width,
                }}
            />
            <View style={styles.info}>
                <Text style={styles.field}>Имя пользователя</Text>
                <Text style={styles.login}>{profileInfo1.login}</Text>
                <Text style={styles.field}>Обо мне:</Text>
                <Text style={styles.aboutMe}>{profileInfo1.aboutMe}</Text>
            </View>
            {profileInfo1.login === 'sergey_koryagin' ? (
                <Button>
                    Редактировать профиль
                </Button>
            ) : (
                <Button>
                    Написать сообщение
                </Button>
            )}
        </View>
    );
};

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