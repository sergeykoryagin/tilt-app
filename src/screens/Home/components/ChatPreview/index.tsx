import React, { FC } from 'react';
import { StyleSheet, View, Image, Text, ViewStyle, Animated } from 'react-native';
import { Link } from '@react-navigation/native';
import { DefaultShadow } from 'components/DefaultShadow';
import { IsReadCircle } from 'components/IsReadCircle';
import { Fonts } from 'constants/fonts';
import { useAnimatedSmilingColor } from 'hooks/useAnimatedSmilingColor';
import { ChatItem } from 'interfaces/model/chat-item';
import { MainStackParamList, ScreenName } from 'navigation/navigation';
import { Color } from 'constants/color';

interface Props {
    chat: ChatItem;
    style?: ViewStyle;
}

export const ChatPreview: FC<Props> = ({ chat, style }: Props): JSX.Element => {
    const backgroundColor = useAnimatedSmilingColor(chat.lastMessage.isUserSmiled);

    return (
        <DefaultShadow style={style}>
            <Link<MainStackParamList>
                to={{ screen: ScreenName.CHAT, params: { chatId: chat.chatId } }}
                style={[styles.link]}
            >
                <Animated.View style={[styles.chatItem, { backgroundColor }]}>
                    <Link<MainStackParamList>
                        to={{ screen: ScreenName.PROFILE, params: { userId: chat.userId } }}
                        style={styles.avatarLink}
                    >
                        <View>
                            <Image
                                source={require('assets/images/avatar-doge.png')}
                                style={styles.avatar}
                            />
                        </View>
                    </Link>
                    <View style={styles.info}>
                        <View style={styles.top}>
                            <Text style={styles.login}>{chat.userLogin}</Text>
                            <Text style={styles.time}>{chat.lastMessage.createdAt}</Text>
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
    chatItem: {
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