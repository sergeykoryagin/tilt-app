import { makeAutoObservable } from 'mobx';
import { Stores } from 'stores/stores';

export class ErrorStore {
    error: string | null = null;

    constructor(private stores: Stores) {
        makeAutoObservable(this);
    }

    setError = (error: string | null): void => {
        this.error = error;
    };

    clearError = (): void => {
        setTimeout(() => this.setError(null), 500);
    };
}