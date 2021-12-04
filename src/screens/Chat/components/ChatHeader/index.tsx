import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Link } from '@react-navigation/native';
import { MainStackParamList, ScreenName } from 'navigation/navigation';
import { chatItems } from 'interfaces/model/chat-item';
import { Color } from 'constants/color';
import { Fonts } from 'constants/fonts';
import ArrowLeftIcon from 'svg-icons/arrow-left.svg';

interface Props {
    onBackButtonPress: () => void;
}

export const ChatHeader: FC<Props> = ({ onBackButtonPress }: Props): JSX.Element => {

    return (
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

            <Link<MainStackParamList> to={{ screen: ScreenName.PROFILE, params: { userId: chatItems[0].userId } }}>
                <View style={styles.userInfo}>
                    <View style={styles.info}>
                        <Text style={styles.login}>{chatItems[0].userLogin}</Text>
                        <Text style={styles.aboutMe}>rtrtrtr</Text>
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
        borderRadius: 30,
    }
});