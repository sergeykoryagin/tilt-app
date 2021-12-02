import { useMemo } from 'react';

interface OffsetCondition {
    condition: boolean,
    offsetValue: number,
}
type OffsetConditions = Array<OffsetCondition>;

export const useShadowOffset = (offsetConditions: OffsetConditions, defaultOffset: number) => {
    return useMemo(() => {
        const offsetCondition = offsetConditions.find((offsetCondition: OffsetCondition): boolean => offsetCondition.condition);
        return offsetCondition ? offsetCondition.offsetValue : defaultOffset;
    }, [offsetConditions]);
};