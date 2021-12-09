import { makeAutoObservable } from 'mobx';
import { getDataSendPermissionsInfo, updateDataSendPermissionsInfo } from 'services/api/main.api';
import { Stores } from 'stores/stores';

export class PermissionsStore {
    hasCameraPermissions = false;
    hasDataSendPermissions = false;
    isLoading = false;

    constructor(private stores: Stores) {
        makeAutoObservable(this);
    }

    setHasCameraPermissions = (hasCameraPermissions: boolean): void => {
        this.hasCameraPermissions = hasCameraPermissions;
    };

    setHasDataSendPermissions = (hasDataSendPermissions: boolean): void => {
        this.hasDataSendPermissions = hasDataSendPermissions;
    };

    setIsLoading = (isLoading: boolean): void => {
        this.isLoading = isLoading;
    };

    getDataSendPermissionsInfo = async (): Promise<void> => {
        this.setIsLoading(true);
        try {
            const { data: dataSendPermissionsInfo } = await getDataSendPermissionsInfo();
            this.setHasDataSendPermissions(dataSendPermissionsInfo.hasDataSendPermissions);
        } catch (error) {
            this.stores.errorStore.setError('Ошибка в получении информации об отправки данных!');
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    };

    updateDataSendPermissionsInfo = async (hasDataSendPermissions: boolean): Promise<void> => {
        this.setIsLoading(true);
        try {
            const { data: dataSendPermissionsInfo } = await updateDataSendPermissionsInfo({
                hasDataSendPermissions
            });
            this.setHasDataSendPermissions(dataSendPermissionsInfo.hasDataSendPermissions);
        } catch (error) {
            this.stores.errorStore.setError('Ошибка в получении информации об отправки данных!');
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    };
}