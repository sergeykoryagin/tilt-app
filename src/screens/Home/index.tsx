import { chatItems } from 'interfaces/model/chat-item';
import React, { FC, useState, } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Input } from 'components/Input';
import { Line } from 'components/Line';
import { SegmentedControl } from 'components/SegmentedControl';
import { Color } from 'constants/color';
import { MainStackParamList, ScreenName } from 'navigation/navigation';
import { ChatPreview } from 'screens/Home/components/ChatPreview';
import { HomeHeader } from 'screens/Home/components/HomeHeader';
import { HomePageSegment, homePageSegments } from 'screens/Home/utils/home-page-segments';
import SearchIcon from 'svg-icons/search.svg';

type Props = NativeStackScreenProps<MainStackParamList, ScreenName.HOME>;

export const Home: FC<Props> = (): JSX.Element => {
    const [segment, setSegment] = useState<HomePageSegment>(HomePageSegment.CHATS);
    const handleSegmentChange = (segment: HomePageSegment): void => {
        setSegment(segment);
    };

    return (
        <View style={styles.screen}>
            <HomeHeader />
            <Line />
            <Input
                placeholder='Введите имя пользователя...'
                style={styles.input}
                suffix={<SearchIcon width={24} height={24} fill={Color.BLACK_200} />}
            />
            <SegmentedControl
                segments={homePageSegments}
                valueIndex={segment}
                onChange={handleSegmentChange}
                style={styles.segments}
            />
            <FlatList
                data={chatItems}
                keyExtractor={(chat) => chat.chatId}
                style={styles.chats}
                numColumns={1}
                contentContainerStyle={styles.chatsContainer}
                renderItem={({ item }) => <ChatPreview chat={item} style={styles.chatItem} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        alignItems: 'center',
        paddingTop: 44,
        backgroundColor: Color.WHITE,
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    input: {
        marginTop: 16,
        width: 327,
    },
    segments: {
        marginVertical: 16,
    },
    chatItem: {
        marginBottom: 8,
    },
    chats: {
        width: '100%',
    },
    chatsContainer: {
        alignItems: 'center'
    }
});