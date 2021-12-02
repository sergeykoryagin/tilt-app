import { Fonts } from 'constants/fonts';
import { useShadowOffset } from 'hooks/useShadowOffset';
import React, { FC, useCallback, useState } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { StyleSheet, ViewStyle, TouchableWithoutFeedback, Text, View } from 'react-native';
import { Color } from 'constants/color';
import { getStyleByCondition } from 'utils/get-style-by-condition';

interface Props {
    children: string;
    onPress?: () => void;
    style?: ViewStyle;
    disabled?: boolean;
}

export enum SHADOW_OFFSET {
    DISABLED_PRESSED = 0,
    DEFAULT = 2,
}

export const Button: FC<Props> = ({
    children,
    onPress,
    style,
    disabled = false,
}: Props): JSX.Element => {
    const [pressed, setPressed] = useState<boolean>(false);
    const togglePressed = useCallback(() => setPressed((prev: boolean): boolean => !prev), []);
    const shadowOffset = useShadowOffset([
        { condition: pressed || disabled, offsetValue: SHADOW_OFFSET.DISABLED_PRESSED }
    ], SHADOW_OFFSET.DEFAULT);

    return (
        <Shadow
            distance={pressed || disabled ? 0 : 2}
            offset={[shadowOffset, shadowOffset]}
            startColor={`${Color.BLACK_500}80`}
            containerViewStyle={style}
        >
            <TouchableWithoutFeedback
                onPress={onPress}
                disabled={disabled}
                style={styles.touchable}
                onPressIn={togglePressed}
                onPressOut={togglePressed}
            >
                <View style={{
                    ...styles.button,
                    ...getStyleByCondition(pressed, styles.buttonPressed),
                    ...getStyleByCondition(disabled, styles.buttonDisabled),
                }}>
                    <Text style={{
                        ...styles.text,
                        ...getStyleByCondition(disabled, styles.textDisabled),
                        ...getStyleByCondition(pressed, styles.textPressed),
                    }}>{children}</Text>
                </View>
            </TouchableWithoutFeedback>
        </Shadow>
    );
};

const styles = StyleSheet.create({
    touchable: {
        borderRadius: 8,
    },
    button: {
        backgroundColor: Color.BLACK_200,
        color: Color.BLACK_500,
        width: 320,
        height: 48,
        borderRadius: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDisabled: {
        backgroundColor: Color.BLACK_200,
    },
    buttonPressed: {
        backgroundColor: Color.BLACK_300,
        color: Color.WHITE,
    },
    text: {
        ...Fonts.buttonDefault,
    },
    textDisabled: {
        ...Fonts.buttonDisabled,
        color: Color.BLACK_300,
    },
    textPressed: {
        color: Color.WHITE,
    },
});