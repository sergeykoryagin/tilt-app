import { FaceDetectionResult } from 'expo-camera';
import { useState } from 'react';

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