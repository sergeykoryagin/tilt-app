import { Fonts } from 'constants/fonts';
import { useStores } from 'hooks/useStores';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { Color } from 'constants/color';
import { getStyleByCondition } from 'utils/get-style-by-condition';

export const Error: FC = observer((): JSX.Element => {
    const { errorStore: { error, clearError } } = useStores();
    const position = useRef(new Animated.Value(-100)).current;
    const [showError, setShowError] = useState<boolean>(!!error);

    useEffect(() => {
        const positionValue = showError ? 150 : -100;
        Animated.timing(position, {
            toValue: positionValue,
            duration: 300,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
        }).start();
    }, [showError]);

    useEffect(() => {
        setShowError(!!error);
    }, [error]);

    const handleHideError = () => {
        setShowError(false);
        clearError();
    };

    return (
        <TouchableWithoutFeedback
            onPressIn={handleHideError}
        >
            <Animated.View style={[
                styles.errorWrapper,
                getStyleByCondition(!!error, styles.errorShow),
                { transform: [{translateY: position }] }
            ]}>
                <Text style={styles.errorText}>{error}</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
});

const styles = StyleSheet.create({
    errorWrapper: {
        width: 250,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Color.RED_LIGHT,
        position: 'absolute',
        zIndex: 15,
        alignSelf: 'center',
    },
    errorText: {
        ...Fonts.label,
        color: Color.RED,
        textAlign: 'center',
    },
    errorShow: {
    }
});