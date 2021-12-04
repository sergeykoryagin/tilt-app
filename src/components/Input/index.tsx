import React, { FC, ReactNode, useCallback, useState } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { Animated, KeyboardType, OpaqueColorValue, StyleSheet, TextInput, ViewStyle } from 'react-native';
import { Fonts } from 'constants/fonts';
import { useShadowOffset } from 'hooks/useShadowOffset';
import { Color } from 'constants/color';
import { getStyleByCondition } from 'utils/get-style-by-condition';

interface Props {
    value?: string;
    onChangeText?: (value: string) => void;
    style?: ViewStyle;
    placeholder?: string;
    secureTextEntry?: boolean;
    editable?: boolean;
    suffix?: ReactNode;
    multiline?: boolean;
    keyboardType?: KeyboardType;
    blurOnSubmit?: boolean;
    backgroundColor?: string | Animated.Value | Animated.AnimatedInterpolation | OpaqueColorValue;
}

enum SHADOW_OFFSET {
    DISABLED = 0,
    DEFAULT = 2,
    FOCUSED = 5,
}

export const Input: FC<Props> = ({
    value,
    onChangeText,
    style,
    placeholder,
    suffix,
    keyboardType,
    blurOnSubmit,
    secureTextEntry = false,
    editable = true,
    multiline = false,
    backgroundColor = Color.BLACK_100,
}: Props): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);
    const toggleFocus = useCallback(() => setFocused((prev: boolean): boolean => !prev), []);
    const shadowOffset = useShadowOffset([
        { condition: !editable, offsetValue: SHADOW_OFFSET.DISABLED },
        { condition: focused, offsetValue: SHADOW_OFFSET.FOCUSED },
    ], SHADOW_OFFSET.DEFAULT);

    return (
        <Shadow
            offset={[shadowOffset, shadowOffset]}
            distance={editable ? 2 : 0}
            startColor={`${Color.BLACK_500}80`}
            containerViewStyle={style}
        >
            <Animated.View
                style={[
                    styles.inputWrapper,
                    { backgroundColor },
                    getStyleByCondition(!editable, styles.inputDisabled),
                    getStyleByCondition(multiline, styles.inputWrapperMultiline),
                ]}
            >
                <TextInput
                    value={value}
                    style={{
                        ...styles.input,
                        ...getStyleByCondition(!editable, styles.inputDisabled),
                        ...getStyleByCondition(!!suffix, styles.inputWithSuffix)
                    }}
                    placeholder={!focused ? placeholder : undefined}
                    onChangeText={onChangeText}
                    onFocus={toggleFocus}
                    onBlur={toggleFocus}
                    placeholderTextColor={Color.BLACK_200}
                    selectionColor={Color.BLACK_400}
                    secureTextEntry={secureTextEntry}
                    editable={editable}
                    multiline={multiline}
                    textAlignVertical={multiline ? 'top' : 'center'}
                    autoCorrect={false}
                    blurOnSubmit={blurOnSubmit}
                    keyboardType={keyboardType}
                />
                {suffix}
            </Animated.View>
        </Shadow>
    );
};

const styles = StyleSheet.create({
    inputWrapper: {
        height: 48,
        width: '100%',
        maxWidth: 327,
        borderRadius: 8,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    inputWrapperMultiline: {
        height: 80,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    input: {
        ...Fonts.input,
        color: Color.BLACK_500,
        width: '100%',
        height: '100%',
    },
    inputDisabled: {
        backgroundColor: Color.BLACK_300,
        color: Color.BLACK_200,
    },
    inputWithSuffix: {
        width: '90%'
    },
});