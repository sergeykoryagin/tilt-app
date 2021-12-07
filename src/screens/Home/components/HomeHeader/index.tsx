import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { DefaultAvatar } from 'components/DefaultAvatar';
import { useStores } from 'hooks/useStores';
import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Link } from '@react-navigation/native';
import { MainStackParamList, ScreenName } from 'navigation/navigation';
import { UserInfo } from 'interfaces/model/user-info';
import { Color } from 'constants/color';
import { Fonts } from 'constants/fonts';
import SettingsIcon from 'svg-icons/settings.svg';

export const HomeHeader: FC = (): JSX.Element => {
    const { getItem: getProfile } = useAsyncStorage('@profileInfo');
    const [profile, setProfile] = useState<UserInfo>();

    useEffect(() => {
        getProfile().then((profile) => {
            profile && setProfile(JSON.parse(profile));
        });
    }, []);

    const { authStore: { signOut } } = useStores();

    return (
        <View style={styles.header}>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={signOut}
            >
                <SettingsIcon
                    width={36}
                    height={36}
                    fill={Color.BLACK_400}
                />
            </TouchableOpacity>

            {profile && (
                <Link<MainStackParamList> to={{screen: ScreenName.PROFILE, params: {userId: profile.id}}}>
                    <View style={styles.userInfo}>
                        <View style={styles.info}>
                            <Text style={styles.login}>{profile.login}</Text>
                            <Text style={styles.aboutMe}>{profile.aboutMe}</Text>
                        </View>
                        {profile.avatar ? (
                            <Image
                                source={{uri: profile.avatar}}
                                style={styles.avatar}
                            />
                        ) : (
                            <DefaultAvatar style={styles.avatar} />
                        )}
                    </View>
                </Link>
            )}
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
        backgroundColor: Color.WHITE,
        paddingBottom: 24,
        zIndex: 1,
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
        overflow: 'hidden',
    }
});