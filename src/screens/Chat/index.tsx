import { Fonts } from 'constants/fonts';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Camera } from 'expo-camera';
import { MessageItem } from 'interfaces/model/message-item';
import { FaceDetectorMode, FaceDetectorClassifications } from 'expo-face-detector';
import { Input } from 'components/Input';
import { Line } from 'components/Line';
import { Color } from 'constants/color';
import { useAnimatedSmilingColor } from 'hooks/useAnimatedSmilingColor';
import { useSmilingProbability } from 'hooks/useSmilingProbability';
import { MainStackParamList, ScreenName } from 'navigation/navigation';
import { ChatHeader } from 'screens/Chat/components/ChatHeader';
import { Message } from 'screens/Chat/components/Message';
import { useChatMessages } from 'screens/Chat/hooks/useChatMessages';
import SendIcon from 'svg-icons/send-message.svg';

type Props = NativeStackScreenProps<MainStackParamList, ScreenName.CHAT>;

export const Chat: FC<Props> = observer(({ navigation, route }: Props): JSX.Element => {
    const { handleFaceDetected, isSmiling, isIncognito } = useSmilingProbability();
    const inputBackgroundColor = useAnimatedSmilingColor(!isIncognito && isSmiling);
    const {
        messages,
        messageText,
        handleSendMessage,
        handleMessageTextChange
    } = useChatMessages(route.params.userId);

    const handleBackButtonPress = (): void => {
        navigation.goBack();
    };

    const onMessageSend = () => {
        handleSendMessage(isSmiling);
    };

    return (
        <View style={styles.screen}>
            {!isIncognito && (
                <Camera
                    onFacesDetected={handleFaceDetected}
                    faceDetectorSettings={{
                        mode: FaceDetectorMode.fast,
                        minDetectionInterval: 300,
                        runClassifications: FaceDetectorClassifications.none,
                    }}
                    style={styles.camera}
                    type={Camera.Constants.Type.front}
                />
            )}
            <ChatHeader onBackButtonPress={handleBackButtonPress} userId={route.params.userId} />
            <Line />
            <FlatList<MessageItem>
                contentContainerStyle={styles.messageContainer}
                style={styles.messages}
                numColumns={1}
                keyExtractor={(item) => item.id}
                data={toJS(messages)}
                renderItem={({ item }) => (
                    <Message message={item} style={styles.message}/>
                )}
                inverted={true}
            />
            {!messages && (
                <Text style={styles.noMessages}>У вас нет истории сообщений с этим пользователем...</Text>
            )}
            <Line />
            <Input
                style={styles.input}
                placeholder='Введите сообщение...'
                multiline
                suffix={
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={onMessageSend}
                    >
                        <SendIcon width={36} height={36} fill={Color.BLACK_400} />
                    </TouchableOpacity>
                }
                backgroundColor={inputBackgroundColor}
                value={messageText}
                onChangeText={handleMessageTextChange}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        paddingTop: 44,
        backgroundColor: Color.WHITE,
    },
    camera: {
        height: 1,
        width: 1,
        position: 'absolute',
        opacity: 0.01
    },
    messages: {
        width: '100%',
    },
    messageContainer: {
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    message: {
        marginTop: 8,
    },
    input: {
        marginTop: 12,
        marginBottom: 20,
    },
    noMessages: {
        ...Fonts.label,
        alignSelf: 'center',
        textAlign: 'center',
        maxWidth: 200,
        marginBottom: 48,
    },
});
