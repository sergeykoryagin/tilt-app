import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Color } from 'constants/color';

interface Props {
    style?: ViewStyle;
}

export const Line: FC<Props> = ({ style }: Props): JSX.Element => <View style={[styles.line, style]}/>;

const styles = StyleSheet.create({
    line: {
        height: 1,
        width: '100%',
        backgroundColor: Color.BLACK_100,
    },
});