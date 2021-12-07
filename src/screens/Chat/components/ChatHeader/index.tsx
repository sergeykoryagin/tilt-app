import { DefaultAvatar } from 'components/DefaultAvatar';
import { Base64ImagePrefix } from 'constants/base64-image-prefix';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Link } from '@react-navigation/native';
import { MainStackParamList, ScreenName } from 'navigation/navigation';
import { Color } from 'constants/color';
import { Fonts } from 'constants/fonts';
import { SmileStatus } from 'screens/Chat/components/SmileStatus';
import { useProfileInfo } from 'screens/Profile/hooks/useProfileInfo';
import ArrowLeftIcon from 'svg-icons/arrow-left.svg';

interface Props {
    onBackButtonPress: () => void;
    userId?: string;
}

export const ChatHeader: FC<Props> = observer(({ onBackButtonPress, userId }: Props): JSX.Element => {
    const { profile, smileStatus } = useProfileInfo(userId);
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={onBackButtonPress}
                >
                    <ArrowLeftIcon
                        width={48}
                        height={48}
                        fill={Color.BLACK_400}
                    />
                </TouchableOpacity>

                <Link<MainStackParamList> to={{ screen: ScreenName.PROFILE, params: { userId: profile?.id || '' } }}>
                    <View style={styles.userInfo}>
                        <View style={styles.info}>
                            <Text style={styles.login}>{profile?.login}</Text>
                            <Text style={styles.aboutMe}>{profile?.aboutMe}</Text>
                        </View>
                        {profile?.avatar ? (
                            <Image
                                source={{ uri: `${Base64ImagePrefix}${profile.avatar}` }}
                                style={styles.avatar}
                            />
                        ) : (
                            <DefaultAvatar style={styles.avatar} />
                        )}
                    </View>
                </Link>
            </View>
            <SmileStatus
                smileStatus={smileStatus}
                style={styles.status}
            />
        </>
    );
});

const styles = StyleSheet.create({
    header: {
        width: '100%',
        maxWidth: 327,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
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
        overflow: 'hidden',
        borderRadius: 30,
    },
    status: {
        marginBottom: 12,
        width: '100%',
    },
});