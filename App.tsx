import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SocketConnection } from 'components/SocketConnection';
import { Color } from 'constants/color';
import { useInterFont } from 'hooks/useInterFont';
import { Routes } from 'components/Routes';
import { stores, StoresContext } from 'context/stores-context';
import 'services/interceptors';

export default function App() {
    const [isLoaded] = useInterFont();
    if (!isLoaded) {
        return <View style={{backgroundColor: 'red'}}/>;
    }

    return (
        <StoresContext.Provider value={stores}>
            <SocketConnection />
            <View style={styles.container}>
                <Routes />
            </View>
        </StoresContext.Provider>
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

