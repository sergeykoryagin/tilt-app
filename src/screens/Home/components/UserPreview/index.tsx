import { DefaultAvatar } from 'components/DefaultAvatar';
import { Base64ImagePrefix } from 'constants/base64-image-prefix';
import { useStores } from 'hooks/useStores';
import { UserInfo } from 'interfaces/model/user-info';
import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { StyleSheet, View, Image, Text, ViewStyle } from 'react-native';
import { Link } from '@react-navigation/native';
import { DefaultShadow } from 'components/DefaultShadow';
import { Fonts } from 'constants/fonts';
import { MainStackParamList, ScreenName } from 'navigation/navigation';
import { Color } from 'constants/color';
import { formatISOstring } from 'utils/formatISOstring';

interface Props {
    user: UserInfo;
    style?: ViewStyle;
}

export const UserPreview: FC<Props> = observer(({ user, style }: Props): JSX.Element => {
    const { socketConnectionStore: { onlineUsers } } = useStores();
    const isOnline = useMemo(() => onlineUsers.has(user.id), [onlineUsers.get(user.id)]);

    return (
        <DefaultShadow style={style}>
            <Link<MainStackParamList>
                to={{ screen: ScreenName.PROFILE, params: { userId: user.id } }}
                style={[styles.link]}
            >
                <View style={styles.userItem}>
                    <View style={styles.info}>
                        <View style={styles.top}>
                            <Text style={styles.login}>{user.login}</Text>
                            <Text style={styles.onlineStatus}>
                                {isOnline
                                    ? 'В сети'
                                    : formatISOstring(user.wasOnline)
                                }
                            </Text>
                        </View>
                        <Text style={styles.aboutMe}>{user.aboutMe}</Text>
                    </View>
                    {user.avatar ? (
                        <Image
                            source={{uri: `${Base64ImagePrefix}${user.avatar}`}}
                            style={styles.avatar}
                        />
                    ) : (
                        <DefaultAvatar style={styles.avatarWrapper} />
                    )}
                </View>
            </Link>
        </DefaultShadow>
    );
});

const styles = StyleSheet.create({
    link: {
        borderRadius: 16,
    },
    userItem: {
        height: 80,
        width: '100%',
        maxWidth: 327,
        flexDirection: 'row',
        backgroundColor: Color.BLACK_100,
        padding: 10,
        borderRadius: 16,
    },
    chatItemSmiling: {
        backgroundColor: Color.GREEN_200,
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginLeft: 8,
    },
    avatarWrapper: {
        height: 60,
        width: 60,
        alignItems: 'center',
        borderRadius: 30,
        overflow: 'hidden',
    },
    info: {
        flexGrow: 1,
        height: '100%'
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    login: {
        ...Fonts.usernameSmall,
        flexGrow: 1,
    },
    onlineStatus: {
        ...Fonts.time,
        color: Color.BLACK_300,
    },
    message: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    aboutMe: {
        ...Fonts.messageSmall,
        maxWidth: 200,
        overflow: 'hidden',
    },
});