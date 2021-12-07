import { useCameraPermissions } from 'hooks/useCameraPermissions';
import { useStores } from 'hooks/useStores';
import { throttle } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { FaceDetectionResult } from 'expo-camera';

export const useSmilingProbability = () => {
    const { hasPermissions } = useCameraPermissions();

    const [isSmiling, setIsSmiling] = useState<boolean>(false);

    const isIncognito = useMemo(() => {
        return !hasPermissions;
    }, [hasPermissions]);

    const { socketConnectionStore: { sendSmile } } = useStores();

    const throttledSendSmile = useCallback(throttle((isSmiling: boolean): void => {
        sendSmile(isSmiling);
    }, 500), []);

    const handleFaceDetected = (faceDetectionResult?: FaceDetectionResult): void => {
        const firstFace = faceDetectionResult?.faces[0];
        setIsSmiling(!!firstFace?.smilingProbability && firstFace.smilingProbability > 0.7);
        throttledSendSmile(isSmiling);
    };

    return {
        handleFaceDetected,
        isSmiling,
        isIncognito
    };
};