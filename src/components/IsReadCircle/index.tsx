import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
    style?: ViewStyle;
}

export const IsReadCircle: FC<Props> = ({ style }: Props): JSX.Element => <View style={[styles.circle, style]}/>;

const styles = StyleSheet.create({
    circle: {
        width: 8,
        height: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 4,
    }
});