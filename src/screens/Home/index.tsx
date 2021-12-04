import React, { FC, useState, } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Input } from 'components/Input';
import { Line } from 'components/Line';
import { chatItem1, chatItem2 } from 'interfaces/model/chat-item';
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
            <ChatPreview
                style={styles.chatItem}
                chat={chatItem1}
            />
            <ChatPreview
                chat={chatItem2}
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
});