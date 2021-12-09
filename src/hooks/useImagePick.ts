import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { useCallback, useEffect } from 'react';

export const useImagePick = () => {
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Без разрешения не получится сменить аватарку(');
            }
        })();
    }, []);

    const handlePickImage = useCallback(async (callback: (imageInfo: ImageInfo) => void) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            callback(result);
        }
    }, []);

    return {
        handlePickImage,
    };
};