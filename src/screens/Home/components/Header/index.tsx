import React, { FC } from 'react';
import { Link } from '@react-navigation/native';
import { profileInfo } from 'interfaces/model/profile-info';
import { MainStackParamList, ScreenName } from 'navigation/navigation';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Color } from 'constants/color';
import { Fonts } from 'constants/fonts';
import SettingsIcon from 'svg-icons/settings.svg';

export const Header: FC = (): JSX.Element => {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                activeOpacity={0.6}
            >
                <SettingsIcon
                    width={36}
                    height={36}
                    fill={Color.BLACK_400}
                />
            </TouchableOpacity>

            <Link<MainStackParamList> to={{ screen: ScreenName.PROFILE, params: { userId: 1 } }}>
                <View style={styles.userInfo}>
                    <View style={styles.info}>
                        <Text style={styles.login}>{profileInfo.login}</Text>
                        <Text style={styles.aboutMe}>{profileInfo.aboutMe}</Text>
                    </View>
                    <Image
                        source={require('assets/images/avatar-doge.png')}
                    />
                </View>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        maxWidth: 327,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    info: {
        alignItems: 'flex-end',
        marginRight: 8,
    },
    login: {
        ...Fonts.usernameDefault,
        marginBottom: 4,
    },
    aboutMe: {
        ...Fonts.label,
        color: Color.BLACK_300,
    },
    avatar: {
        height: 60,
        width: 60,
        resizeMode: 'cover',
        borderRadius: 30,
    }
});