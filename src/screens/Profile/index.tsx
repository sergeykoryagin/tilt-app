import { DefaultAvatar } from 'components/DefaultAvatar';
import { Input } from 'components/Input';
import { Base64ImagePrefix } from 'constants/base64-image-prefix';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import {
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from 'components/Button';
import { Color } from 'constants/color';
import { Fonts } from 'constants/fonts';
import { MainStackParamList, ScreenName } from 'navigation/navigation';
import { useEditMode } from 'screens/Profile/hooks/useEditMode';
import { useProfileInfo } from 'screens/Profile/hooks/useProfileInfo';
import ArrowLeftIcon from 'svg-icons/arrow-left.svg';
import { formatISOstring } from 'utils/formatISOstring';
import ChangePhotoIcon from 'svg-icons/change-photo.svg';
import { useAvatarChange } from './hooks/useAvatarChange';

type Props = NativeStackScreenProps<MainStackParamList, ScreenName.PROFILE>;

export const Profile: FC<Props> = observer(({ navigation, route }: Props): JSX.Element => {
    const { width } = useWindowDimensions();
    const {
        profile,
        isMyProfile,
        isOnline,
        isLoading,
        handleRefreshProfile
    } = useProfileInfo(route.params.userId);

    const handleSendMessagePress = () => {
        navigation.navigate(ScreenName.CHAT, { userId: route.params.userId });
    };

    const handleBackButtonPress = () => {
        navigation.goBack();
    };

    const {
        editMode,
        editableAboutMe,
        editableLogin,
        handleEditModePress,
        handleAboutMeChange,
        handleLoginChange,
        handleCancelEditMode,
        handleEditModeSubmit
    } = useEditMode();

    const { handleAvatarChange, deleteAvatar } = useAvatarChange();

    return (
        <ScrollView
            contentContainerStyle={styles.screen}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={handleRefreshProfile}
                />
            }
            scrollEnabled={!editMode}
        >
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={handleBackButtonPress}
                    activeOpacity={0.6}
                >
                    <ArrowLeftIcon fill={Color.WHITE} width={48} height={48} style={styles.backButton} />
                </TouchableOpacity>
                {!isMyProfile && (
                    <Text style={styles.onlineStatus}>
                        {isOnline
                            ? 'В сети'
                            : `был(а) в сети ${profile?.wasOnline && formatISOstring(profile.wasOnline)}`}
                    </Text>
                )}
                {isMyProfile && (
                    <TouchableOpacity
                        onPress={handleAvatarChange}
                        activeOpacity={0.6}
                    >
                        <ChangePhotoIcon width={48} height={48} fill={Color.WHITE} />
                    </TouchableOpacity>
                )}
            </View>
            <Image
                source={require('assets/images/gradient.png')}
                style={{
                    ...styles.gradient,
                    height: width,
                    width,
                }}
            />
            {profile?.avatar ? (
                <Image
                    source={{uri: `${Base64ImagePrefix}${profile?.avatar}`}}
                    style={{
                        ...styles.avatar,
                        height: width,
                        width,
                    }}
                />
            ) : (
                <DefaultAvatar width={width} height={width} />
            )}
            {!editMode && (
                <View style={styles.info}>
                    <Text style={styles.field}>Имя пользователя</Text>
                    <Text style={styles.login}>{profile?.login}</Text>
                    <Text style={styles.field}>Обо мне:</Text>
                    <Text style={styles.aboutMe}>{profile?.aboutMe}</Text>
                </View>
            )}
            {editMode && (
                <View style={styles.info}>
                    <Text style={styles.field}>Имя пользователя</Text>
                    <Input
                        style={styles.loginInput}
                        value={editableLogin}
                        onChangeText={handleLoginChange}
                        maxLength={16}
                    />
                    <Text style={styles.field}>Обо мне:</Text>
                    <Input
                        style={styles.aboutMeInput}
                        value={editableAboutMe}
                        onChangeText={handleAboutMeChange}
                        multiline={true}
                        maxLength={32}
                    />
                </View>
            )}
            {editMode ? (
                <>
                    <Button
                        onPress={handleEditModeSubmit}
                        textColor={Color.GREEN_200}
                    >
                         Сохранить
                    </Button>
                    <Button onPress={handleCancelEditMode}>
                        Отмена
                    </Button>
                </>
            ) : (
                <>
                    {isMyProfile ? (
                        <Button onPress={handleEditModePress}>
                            Редактировать профиль
                        </Button>
                    ) : (
                        <Button onPress={handleSendMessagePress}>
                            Написать сообщение
                        </Button>
                    )}
                </>
            )

            }

        </ScrollView>
    );
});

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: Color.WHITE,
        position: 'relative'
    },
    header: {
        position: 'absolute',
        top: 44,
        left: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: 327,
        zIndex: 2,
    },
    backButton: {
        borderRadius: 16,
        borderWidth: 2,
        borderColor: Color.WHITE,
    },
    onlineStatus: {
        ...Fonts.label,
        color: Color.WHITE,
    },
    gradient: {
        position: 'absolute',
        zIndex: 1,
    },
    avatar: {

    },
    info: {
        width: '100%',
        maxWidth: 327,
        paddingTop: 36,
        marginBottom: 48,
    },
    field: {
        ...Fonts.label,
        color: Color.BLACK_300,
        marginBottom: 8,
    },
    login: {
        ...Fonts.usernameLarge,
        marginBottom: 24,
    },
    aboutMe: {
        ...Fonts.paragraphDefault,
    },
    loginInput: {
        marginBottom: 20,
        width: '100%',
    },
    aboutMeInput: {
        width: '100%',
    }
});