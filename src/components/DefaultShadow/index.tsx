import { Shadow } from 'react-native-shadow-2';
import React, { FC, ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { Color } from 'constants/color';

interface Props {
    children?: ReactNode;
    style?: ViewStyle | (ViewStyle | undefined)[];
    containerViewStyle?: ViewStyle | (ViewStyle | undefined)[];
}

const DEFAULT_SHADOW_OFFSET = 2;

export const DefaultShadow: FC<Props> = ({ children, style, containerViewStyle }: Props): JSX.Element => (
    <Shadow
        offset={[DEFAULT_SHADOW_OFFSET, DEFAULT_SHADOW_OFFSET]}
        distance={DEFAULT_SHADOW_OFFSET}
        startColor={`${Color.BLACK_500}80`}
        containerViewStyle={containerViewStyle}
        viewStyle={[style]}
    >
        {children}
    </Shadow>
);