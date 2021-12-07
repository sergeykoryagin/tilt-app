import { useCameraPermissions } from 'hooks/useCameraPermissions';
import { useMemo, useState } from 'react';
import { FaceDetectionResult } from 'expo-camera';

export const useSmilingProbability = () => {
    const [isSmiling, setIsSmiling] = useState<boolean>(false);

    const { hasPermissions } = useCameraPermissions();

    const isIncognito = useMemo(() => {
        return !hasPermissions;
    }, [hasPermissions]);

    const handleFaceDetected = (faceDetectionResult?: FaceDetectionResult): void => {
        const firstFace = faceDetectionResult?.faces[0];
        setIsSmiling(!!firstFace?.smilingProbability && firstFace.smilingProbability > 0.7);
    };

    return {
        handleFaceDetected,
        isSmiling,
        isIncognito
    };
};