import { useState } from 'react';
import { FaceDetectionResult } from 'expo-camera';

export const useSmilingProbability = () => {
    const [smilingProbability, setSmilingProbability] = useState<number>(0);
    const handleFaceDetected = (faceDetectionResult?: FaceDetectionResult): void => {
        const firstFace = faceDetectionResult?.faces[0];
        setSmilingProbability(firstFace?.smilingProbability || 0);
    };

    return {
        handleFaceDetected,
        smilingProbability,
    };
};