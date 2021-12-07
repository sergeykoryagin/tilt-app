import { Color } from 'constants/color';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { IsReadCircle } from 'components/IsReadCircle';
import { Fonts } from 'constants/fonts';
import { MessageItem } from 'interfaces/model/message-item';
import { useMessage } from 'screens/Chat/components/Message/hooks/useMessage';
import { formatISOstring } from 'utils/formatISOstring';
import { getStyleByCondition } from 'utils/get-style-by-condition';

interface Props {
    message: MessageItem
    style?: ViewStyle;
}

export const Message: FC<Props> = observer(({ style, message }: Props): JSX.Element => {
    const { isMineMessage } = useMessage(message);
    return (
        <View
            style={[
                styles.message,
                getStyleByCondition(message.isSmiling, styles.messageSmiled),
                getStyleByCondition(isMineMessage, styles.mineMessage),
                style,
            ]}
        >
            <Text style={[styles.text, getStyleByCondition(isMineMessage, styles.textMine)]}>{message.text}</Text>
            <View style={[styles.info, getStyleByCondition(isMineMessage, styles.infoMine)]}>
                <Text style={styles.time}>{formatISOstring(message.createdAt)}</Text>
                {!message.isRead && <IsReadCircle />}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    message: {
        flexDirection: 'row',
        maxWidth: '80%',
        minHeight: 48,
        minWidth: 60,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: Color.BLACK_100
    },
    messageSmiled: {
        backgroundColor: Color.GREEN_200,
    },
    mineMessage: {
        flexDirection: 'row-reverse',
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 30,
        alignSelf: 'flex-end',
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