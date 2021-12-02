import { TextStyle, ViewStyle } from 'react-native';

export const getStyleByCondition = <T extends ViewStyle | TextStyle>(condition: boolean, style: T): T | Record<string, never> => {
    return condition ? style : {};
};