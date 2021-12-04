import React, { FC, useMemo } from 'react';
import { Animated, StyleSheet, Text, ViewStyle } from 'react-native';
import { DefaultShadow } from 'components/DefaultShadow';
import { Color } from 'constants/color';
import { Fonts } from 'constants/fonts';
import { useAnimatedSmilingColor } from 'hooks/useAnimatedSmilingColor';
import { formatMoodStatus, getMoodStatusIcon, MoodStatus } from 'screens/Chat/utils/mood-status';
import { getStyleByCondition } from 'utils/get-style-by-condition';

interface Props {
    moodStatus: MoodStatus;
    style?: ViewStyle;
}



export const SmileStatus: FC<Props> = ({ moodStatus, style }: Props): JSX.Element => {
    const MoodIcon = useMemo(() => getMoodStatusIcon(moodStatus), [moodStatus]);
    const animatedSmilingColor = useAnimatedSmilingColor(moodStatus === MoodStatus.SMILE);

    return (
        <DefaultShadow style={style}>
            <Animated.View style={[styles.smileStatus, { backgroundColor: animatedSmilingColor }]}>
                <MoodIcon
                    width={48}
                    height={48}
                    fill={moodStatus === MoodStatus.SMILE ? Color.GREEN_500 : Color.BLACK_400}
                    style={styles.icon}
                />
                <Text
                    style={[
                        styles.text,
                        getStyleByCondition(moodStatus === MoodStatus.SMILE, styles.textSmile)
                    ]}
                >
                    {formatMoodStatus(moodStatus)}
                </Text>
            </Animated.View>
        </DefaultShadow>
    );
};

const styles = StyleSheet.create({
    statusContainer: {
        width: '100%',
        maxWidth: 327,
    },
    smileStatus: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    icon: {
        marginRight: 8,
    },
    text: {
        ...Fonts.messageDefault,
        color: Color.BLACK_400,
        maxWidth: '65%',
        flexGrow: 1,
    },
    textSmile: {
        color: Color.GREEN_500,
    },
});