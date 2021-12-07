import { Base64ImagePrefix } from 'constants/base64-image-prefix';
import { ChatPreviewItem } from 'interfaces/ChatPreviewItem';
import { UserInfo } from 'interfaces/model/user-info';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ViewStyle, Animated } from 'react-native';
import { Link } from '@react-navigation/native';
import { DefaultShadow } from 'components/DefaultShadow';
import { IsReadCircle } from 'components/IsReadCircle';
import { Fonts } from 'constants/fonts';
import { useAnimatedSmilingColor } from 'hooks/useAnimatedSmilingColor';
import { MainStackParamList, ScreenName } from 'navigation/navigation';
import { Color } from 'constants/color';
import { getProfileInfo } from 'services/api/main.api';
import { formatISOstring } from 'utils/formatISOstring';
import { DefaultAvatar } from 'components/DefaultAvatar';

interface Props {
    chat: ChatPreviewItem;
    style?: ViewStyle;
}

export const ChatPreview: FC<Props> = ({ chat, style }: Props): JSX.Element => {
    const backgroundColor = useAnimatedSmilingColor(chat.lastMessage.isSmiling);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        getProfileInfo(chat.userId).then((response) => {
            setUserInfo(response.data);
        });
    }, [chat.userId]);

    return (
        <DefaultShadow style={style}>
            <Link<MainStackParamList>
                to={{ screen: ScreenName.CHAT, params: { userId: chat.userId } }}
                style={[styles.link]}
            >
                <Animated.View style={[styles.listItem, { backgroundColor }]}>
                    <Link<MainStackParamList>
                        to={{ screen: ScreenName.PROFILE, params: { userId: chat.userId } }}
                        style={styles.avatarLink}
                    >
                        <View>
                            {userInfo?.avatar ? (
                                <Image
                                    source={{uri: `${Base64ImagePrefix}${userInfo.avatar}`}}
                                    style={styles.avatar}
                                />
                            ) : (
                                <DefaultAvatar style={styles.avatar} />
                            )}
                        </View>
                    </Link>
                    <View style={styles.info}>
                        <View style={styles.top}>
                            <Text style={styles.login}>{userInfo?.login}</Text>
                            <Text style={styles.time}>{formatISOstring(chat.lastMessage.createdAt)}</Text>
                        </View>
                        <View style={styles.message}>
                            <Text style={styles.messageText}>{chat.lastMessage.text}</Text>
                            {!chat.lastMessage.isRead && <IsReadCircle style={styles.readCircle} />}
                        </View>
                    </View>
                </Animated.View>
            </Link>
        </DefaultShadow>
    );
};

const styles = StyleSheet.create({
    link: {
        borderRadius: 16,
    },
    listItem: {
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
        position: 'relative',
        overflow: 'hidden'
    },
    avatarLink: {
        height: 60,
        width: 60,
        marginRight: 8,
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
    time: {
        ...Fonts.time,
        color: Color.BLACK_300,
    },
    message: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    messageText: {
        ...Fonts.messageSmall,
        maxWidth: 200,
        overflow: 'hidden',
    },
    readCircle: {
        marginTop: 8,
    },
});