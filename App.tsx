import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from 'constants/color';
import {useInterFont} from 'hooks/useInterFont';
import { Routes } from 'components/Routes';

export default function App() {
    const [isLoaded] = useInterFont();

    if (!isLoaded) {
        return <View style={{backgroundColor: 'red'}}>

        </View>;
    }

    return (
        <View style={styles.container}>
            <Routes />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: Color.WHITE,
        justifyContent: 'center',
    },
});
