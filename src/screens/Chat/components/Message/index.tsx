import React, { FC, useMemo } from 'react';
import { Animated, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { DefaultShadow } from 'components/DefaultShadow';
import { IsReadCircle } from 'components/IsReadCircle';
import { Fonts } from 'constants/fonts';
import { useAnimatedSmilingColor } from 'hooks/useAnimatedSmilingColor';
import { MessageItem } from 'interfaces/model/message-item';
import { formatISOstring } from 'utils/formatISOstring';
import { getStyleByCondition } from 'utils/get-style-by-condition';

interface Props {
    message: MessageItem
    style?: ViewStyle;
}

export const Message: FC<Props> = ({ style, message }: Props): JSX.Element => {
    const backgroundColor = useAnimatedSmilingColor(message.isUserSmiled);
    const isMineMessage = useMemo(() => Math.random() > 0.5,
        [message.createdBy]
    );

    return (
        <DefaultShadow containerViewStyle={[style, getStyleByCondition(isMineMessage, styles.containerMine)]}>
            <Animated.View
                style={[
                    styles.message,
                    { backgroundColor },
                    getStyleByCondition(isMineMessage, styles.mineMessage)
                ]}
            >
                <Text style={[styles.text, getStyleByCondition(isMineMessage, styles.textMine)]}>{message.text}</Text>
                <View style={[styles.info, getStyleByCondition(isMineMessage, styles.infoMine)]}>
                    <Text style={styles.time}>{formatISOstring(message.createdAt)}</Text>
                    {!message.isRead && <IsReadCircle />}
                </View>
            </Animated.View>
        </DefaultShadow>
    );
};

const styles = StyleSheet.create({
    containerMine: {
        alignSelf: 'flex-end',
    },
    message: {
        flexDirection: 'row',
        maxWidth: '80%',
        minHeight: 48,
        minWidth: 60,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    },
    mineMessage: {
        flexDirection: 'row-reverse',
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 30,
    },
    text: {
        ...Fonts.messageDefault,
        marginVertical: 8,
        marginLeft: 16,
        marginRight: 8,
        flexShrink: 1,
        textAlign: 'right',
    },
    textMine: {
        marginLeft: 8,
        marginRight: 16,
        textAlign: 'left',
    },
    info: {
        padding: 8,
        flexGrow: 1,
        alignItems: 'flex-end',
    },
    infoMine: {
        alignItems: 'flex-start',
    },
    time: {
        ...Fonts.time,
        marginBottom: 4,
    },
});