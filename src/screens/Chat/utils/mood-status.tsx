import PokerFaceIcon from 'svg-icons/poker-face.svg';
import SmileIcon from 'svg-icons/smile.svg';
import IncognitoIcon from 'svg-icons/incognito.svg';
import UnknownIcon from 'svg-icons/unknown.svg';

export enum MoodStatus {
    POKER_FACE = 'POKER_FACE',
    SMILE = 'SMILE',
    INCOGNITO = 'INCOGNITO',
    UNKNOWN = 'UNKNOWN',
}

const moodStatuses = {
    [MoodStatus.POKER_FACE]: 'Собеседник скорее всего не улыбается',
    [MoodStatus.SMILE]: 'Собеседник вероятно улыбается',
    [MoodStatus.INCOGNITO]: 'Неизвестно о настроении собеседника',
    [MoodStatus.UNKNOWN]: 'Собеседник не хочет делиться настроением',
};

const moodIcons = {
    [MoodStatus.POKER_FACE]: PokerFaceIcon,
    [MoodStatus.SMILE]: SmileIcon,
    [MoodStatus.INCOGNITO]: IncognitoIcon,
    [MoodStatus.UNKNOWN]: UnknownIcon,
};

export const formatMoodStatus = (moodStatus: MoodStatus): string => moodStatuses[moodStatus];

export const getMoodStatusIcon = (moodStatus: MoodStatus) => moodIcons[moodStatus];
