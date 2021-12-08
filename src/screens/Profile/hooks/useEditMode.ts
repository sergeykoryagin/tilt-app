import { useStores } from 'hooks/useStores';
import { useCallback, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export const useEditMode = () => {
    const { profileStore: { userInfo, updateProfile } } = useStores();

    const [editMode, setEditMode] = useState<boolean>(false);

    const [editableLogin, setEditableLogin] = useState<string | undefined>();
    const [editableAboutMe, setEditableAboutMe] = useState<string | undefined>();
    useEffect(() => {
        if (editMode) {
            setEditableLogin(userInfo?.login);
            setEditableAboutMe(userInfo?.aboutMe);
            return;
        }
        setEditableAboutMe('');
        setEditableLogin('');
    }, [editMode]);

    const handleSaveButtonPress = () => {
        if (editableLogin && editableLogin.length > 3) {
            updateProfile(editableLogin, editableAboutMe);
            setEditMode(false);
        }
    };

    const handleCancelButtonPress = () => {
        setEditMode(false);
    };

    const handleEditModePress = () => {
        setEditMode(true);
    };

    return {
        editMode,
        editableLogin,
        editableAboutMe,
        handleLoginChange: setEditableLogin,
        handleAboutMeChange: setEditableAboutMe,
        handleCancelEditMode: handleCancelButtonPress,
        handleEditModePress,
        handleEditModeSubmit: handleSaveButtonPress,
    };
};