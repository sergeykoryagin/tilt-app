import { Fonts } from 'constants/fonts';
import { useStores } from 'hooks/useStores';
import { ChatPreviewItem } from 'interfaces/ChatPreviewItem';
import React, { FC, useState, } from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Input } from 'components/Input';
import { Line } from 'components/Line';
import { SegmentedControl } from 'components/SegmentedControl';
import { Color } from 'constants/color';
import { UserInfo } from 'interfaces/model/user-info';
import { observer } from 'mobx-react-lite';
import { MainStackParamList, ScreenName } from 'navigation/navigation';
import { ChatPreview } from 'screens/Home/components/ChatPreview';
import { HomeHeader } from 'screens/Home/components/HomeHeader';
import { UserPreview } from 'screens/Home/components/UserPreview';
import { useSearchUsers } from 'screens/Home/hooks/useSearchUsers';
import { HomePageSegment, homePageSegments } from 'screens/Home/utils/home-page-segments';
import SearchIcon from 'svg-icons/search.svg';

type Props = NativeStackScreenProps<MainStackParamList, ScreenName.HOME>;

export const Home: FC<Props> = observer((): JSX.Element => {
    const [segment, setSegment] = useState<HomePageSegment>(HomePageSegment.CHATS);
    const handleSegmentChange = (segment: HomePageSegment): void => {
        setSegment(segment);
    };

    const {
        searchTerm,
        setSearchTerm,
        users,
        loadMoreUsers,
    } = useSearchUsers(segment === HomePageSegment.USERS);

    const {
        chatsStore: { orderedChats }
    } = useStores();

    return (
        <View style={styles.screen}>
            <HomeHeader />
            <Line />
            <Input
                placeholder='Введите имя пользователя...'
                style={styles.input}
                suffix={<SearchIcon width={24} height={24} fill={Color.BLACK_200} />}
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <SegmentedControl
                segments={homePageSegments}
                valueIndex={segment}
                onChange={handleSegmentChange}
                style={styles.segments}
            />
            {segment === HomePageSegment.CHATS && (
                <>
                    {orderedChats.length === 0 && (
                        <Text style={styles.hint}>
                            Список чатов пуст...
                        </Text>
                    )}
                    <FlatList<ChatPreviewItem>
                        data={orderedChats}
                        keyExtractor={(chat) => chat.userId}
                        style={styles.list}
                        numColumns={1}
                        contentContainerStyle={styles.listContainer}
                        renderItem={({item}) => <ChatPreview chat={item} style={styles.listItem}/>}
                    />
                </>
            )}
            {segment === HomePageSegment.USERS && (
                <>
                    {users.length === 0 && (
                        <Text style={styles.hint}>
                            {
                                searchTerm.length === 0
                                    ? 'Введите имя пользователя в поле поиска...'
                                    : 'Список пользователей пуст...'
                            }
                        </Text>
                    )}
                    <FlatList<UserInfo>
                        contentContainerStyle={styles.listContainer}
                        data={users}
                        style={styles.list}
                        keyExtractor={(user: UserInfo) => user.id}
                        numColumns={1}
                        renderItem={({item}) => <UserPreview user={item} style={styles.listItem} />}
                        onEndReached={loadMoreUsers}
                    />
                </>
            )}
        </View>
    );
});

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
    listItem: {
        marginBottom: 8,
    },
    list: {
        width: '100%',
    },
    listContainer: {
        alignItems: 'center'
    },
    hint: {
        marginTop: 32,
        ...Fonts.label,
    }
});