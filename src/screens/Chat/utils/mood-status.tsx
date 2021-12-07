import { SmileStatusEnum } from 'interfaces/model/smile-status-enum';
import PokerFaceIcon from 'svg-icons/poker-face.svg';
import SmileIcon from 'svg-icons/smile.svg';
import IncognitoIcon from 'svg-icons/incognito.svg';

const moodStatuses = {
    [SmileStatusEnum.POKER_FACE]: 'Собеседник скорее всего не улыбается',
    [SmileStatusEnum.SMILE]: 'Собеседник вероятно улыбается',
    [SmileStatusEnum.INCOGNITO]: 'Неизвестно о настроении собеседника',
};

const moodIcons = {
    [SmileStatusEnum.POKER_FACE]: PokerFaceIcon,
    [SmileStatusEnum.SMILE]: SmileIcon,
    [SmileStatusEnum.INCOGNITO]: IncognitoIcon,
};

export const formatMoodStatus = (moodStatus: SmileStatusEnum): string => moodStatuses[moodStatus];

export const getMoodStatusIcon = (moodStatus: SmileStatusEnum) => moodIcons[moodStatus];
