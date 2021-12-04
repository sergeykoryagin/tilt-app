import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Color } from 'constants/color';

enum BackgroundColorValue {
    DEFAULT = 0,
    SMILE = 1,
}

export const useAnimatedSmilingColor = (isUserSmiling: boolean) => {
    const backgroundColorValue = useRef(new Animated.Value(BackgroundColorValue.DEFAULT)).current;

    useEffect(() => {
        const colorValue = isUserSmiling ? BackgroundColorValue.SMILE : BackgroundColorValue.DEFAULT;
        Animated.timing(backgroundColorValue, {
            toValue: colorValue,
            duration: 500,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: false,
        }).start();
    }, [isUserSmiling]);

    return backgroundColorValue.interpolate({
        inputRange: [BackgroundColorValue.DEFAULT, BackgroundColorValue.SMILE],
        outputRange: [Color.BLACK_100, Color.GREEN_200],
    });
};