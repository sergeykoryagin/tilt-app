import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from 'constants/color';

export const Line: FC = (): JSX.Element => <View style={styles.line}/>;

const styles = StyleSheet.create({
    line: {
        height: 1,
        width: '100%',
        backgroundColor: Color.BLACK_100,
    },
});