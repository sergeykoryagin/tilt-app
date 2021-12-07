import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import DefaultAvatarIcon from 'svg-icons/dog.svg';

interface Props {
    style?: ViewStyle;
    width?: number;
    height?: number;
}

export const DefaultAvatar: FC<Props> = ({ style, width = 60, height = 60 }: Props): JSX.Element => (
    <View style={style}>
        <DefaultAvatarIcon width={width} height={height}/>
    </View>
);