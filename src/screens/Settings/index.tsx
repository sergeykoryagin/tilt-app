import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList, ScreenName } from 'navigation/navigation';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from 'constants/color';

type Props = NativeStackScreenProps<MainStackParamList, ScreenName.CHAT>;

export const Settings: FC<Props> = ({ navigation }: Props): JSX.Element => (
    <View style={styles.screen}>

    </View>
);

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: Color.WHITE,
        position: 'relative'
    },
});