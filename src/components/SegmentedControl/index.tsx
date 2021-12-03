import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, ViewStyle, TouchableWithoutFeedback, Text, View } from 'react-native';
import { Fonts } from 'constants/fonts';
import { Color } from 'constants/color';
import { getStyleByCondition } from 'utils/get-style-by-condition';

interface Props {
    segments: [string, string];
    valueIndex?: number;
    onChange?: (valueIndex: number) => void;
    style?: ViewStyle;
}

export const SegmentedControl: FC<Props> = ({
    segments,
    onChange,
    style,
    valueIndex = 0,
}: Props): JSX.Element => {
    const [selectedIndex, setSelectedIndex] = useState<number>(valueIndex);

    useEffect(() => {
        if (valueIndex !== selectedIndex) {
            setSelectedIndex(valueIndex);
        }
    }, [valueIndex]);

    const handleSegmentPress = (index: number): void => {
        setSelectedIndex(index);
        onChange?.(index);
    };

    return (
        <View style={{
            ...styles.segmentedControl,
            ...style,
        }}>
            <View style={{
                ...styles.slider,
                transform: [{ translateX: 163 * selectedIndex }]
            }} />
            <View style={styles.delimeter}/>
            {segments.map((segment, index) => (
                <TouchableWithoutFeedback
                    key={index}
                    disabled={index === selectedIndex}
                    onPress={() => handleSegmentPress(index)}
                >
                    <View style={styles.segment}>
                        <Text
                            style={{
                                ...styles.segmentText,
                                ...getStyleByCondition(index === selectedIndex, styles.segmentTextSelected),
                            }}
                        >
                            {segment}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    segmentedControl: {
        width: 327,
        height: 36,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Color.BLACK_100,
        position: 'relative',
    },
    slider: {
        height: 28,
        width: 156,
        backgroundColor: Color.BLACK_200,
        position: 'absolute',
        left: 4,
        borderRadius: 4,
        elevation: 4,
    },
    delimeter: {
        position: 'absolute',
        height: 36,
        width: 1,
        top: 0,
        left: 163,
        backgroundColor: Color.BLACK_200
    },
    segment: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 163,
        height: 36,
        elevation: 5
    },
    segmentText: {
        ...Fonts.microText,
    },
    segmentTextSelected: {
        color: Color.WHITE,
    }
});