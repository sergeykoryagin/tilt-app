import React, { FC, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
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
import { SmileStatus } from 'screens/Chat/components/SmileStatus';
import { MoodStatus } from 'screens/Chat/utils/mood-status';
import SendIcon from 'svg-icons/send-message.svg';
import messages from 'utils/mocks/messages.json';

type Props = NativeStackScreenProps<MainStackParamList, ScreenName.CHAT>;

export const Chat: FC<Props> = ({ navigation, route }: Props): JSX.Element => {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const handleBackButtonPress = (): void => {
        navigation.goBack();
    };
    const { handleFaceDetected, smilingProbability } = useSmilingProbability();
    const inputBackgroundColor = useAnimatedSmilingColor(smilingProbability > 0.8);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    return (
        <View style={styles.screen}>
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
            <ChatHeader onBackButtonPress={handleBackButtonPress} />
            <SmileStatus
                moodStatus={MoodStatus.SMILE}
                style={styles.status}
            />
            <Line />
            <FlatList<MessageItem>
                contentContainerStyle={styles.messageContainer}
                style={styles.messages}
                numColumns={1}
                keyExtractor={(item) => item.messageId}
                data={messages}
                renderItem={({ item }) => (
                    <Message message={item} style={styles.message}/>
                )}
                inverted={true}
            />
            <Line />
            <Input
                style={styles.input}
                placeholder='Введите сообщение...'
                multiline
                suffix={<SendIcon width={36} height={36} fill={Color.BLACK_400} />}
                backgroundColor={inputBackgroundColor}
            />
        </View>
    );
};

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
    status: {
        marginBottom: 12,
        width: '100%',
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
});