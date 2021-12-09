import { useStores } from 'hooks/useStores';
import { throttle } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { FaceDetectionResult } from 'expo-camera';

export const useSmilingProbability = () => {
    const { permissionsStore: { hasDataSendPermissions, hasCameraPermissions } } = useStores();

    const [isSmiling, setIsSmiling] = useState<boolean>(false);

    const isIncognito = useMemo(() => {
        return !hasDataSendPermissions || !hasCameraPermissions;
    }, [hasDataSendPermissions, hasCameraPermissions]);

    const { socketConnectionStore: { sendSmile } } = useStores();

    const throttledSendSmile = useCallback(throttle((isSmiling: boolean): void => {
        !isIncognito && sendSmile(isSmiling);
    }, 500), [isIncognito]);

    const handleFaceDetected = (faceDetectionResult?: FaceDetectionResult): void => {
        const firstFace = faceDetectionResult?.faces[0];
        setIsSmiling(!!firstFace?.smilingProbability && firstFace.smilingProbability > 0.8);
        throttledSendSmile(isSmiling);
    };

    return {
        handleFaceDetected,
        isSmiling,
        isIncognito
    };
};