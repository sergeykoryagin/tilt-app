import React from 'react';
import { StyleSheet, View } from 'react-native';
import {useInterFont} from 'hooks/useInterFont';
import {SignIn} from 'screens/SignIn';

export default function App() {
    const [isLoaded] = useInterFont();
    
    if (!isLoaded) {
        return <View style={{backgroundColor: 'red'}}>

        </View>;
    }

    return (
        <View style={styles.container}>
            <SignIn />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
