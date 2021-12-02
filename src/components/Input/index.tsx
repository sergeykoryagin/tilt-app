import { useShadowOffset } from 'hooks/useShadowOffset';
import React, { FC, useCallback, useState } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { StyleSheet, TextInput, ViewStyle } from 'react-native';
import { Color } from 'constants/color';
import { getStyleByCondition } from 'utils/get-style-by-condition';

interface Props {
    value?: string;
    onChangeText?: (value: string) => void;
    style?: ViewStyle;
    placeholder?: string;
    secureTextEntry?: boolean;
    editable?: boolean;
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
    secureTextEntry = false,
    editable = true,
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
            <TextInput
                value={value}
                style={{
                    ...styles.input,
                    ...getStyleByCondition(!editable, styles.inputDisabled),
                }}
                placeholder={!focused ? placeholder : undefined}
                onChangeText={onChangeText}
                onFocus={toggleFocus}
                onBlur={toggleFocus}
                placeholderTextColor={Color.BLACK_200}
                selectionColor={Color.BLACK_400}
                secureTextEntry={secureTextEntry}
                editable={editable}
            />
        </Shadow>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: Color.WHITE,
        color: Color.BLACK_500,
        width: 320,
        height: 48,
        borderRadius: 8,
        paddingHorizontal: 12
    },
    inputDisabled: {
        backgroundColor: Color.BLACK_100,
        color: Color.BLACK_300,
    },
});