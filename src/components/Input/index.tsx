import React, { FC, ReactNode, useCallback, useState } from 'react';
import { Fonts } from 'constants/fonts';
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { useShadowOffset } from 'hooks/useShadowOffset';
import { Shadow } from 'react-native-shadow-2';
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
            <View style={{
                ...styles.inputWrapper,
                ...getStyleByCondition(!editable, styles.inputDisabled),
                ...getStyleByCondition(!!suffix, styles.inputWrapperWithSuffix)
            }}>
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
                />
                {suffix}
            </View>
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
        backgroundColor: Color.WHITE,
        alignItems: 'center',
    },
    inputWrapperWithSuffix: {
        paddingRight: 12,
    },
    input: {
        ...Fonts.input,
        backgroundColor: Color.WHITE,
        color: Color.BLACK_500,
        width: '100%',
        height: '100%',
        paddingHorizontal: 12,
    },
    inputDisabled: {
        backgroundColor: Color.BLACK_300,
        color: Color.BLACK_200,
    },
    inputWithSuffix: {
        width: '90%'
    },
});