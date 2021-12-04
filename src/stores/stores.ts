import { AuthStore } from 'stores/auth-store';
import { ChatsStore } from 'stores/chats-store';
import { DialogStore } from 'stores/dialog-store';
import { ProfileStore } from 'stores/profile-store';

export class Stores {
    authStore: AuthStore;
    profileStore: ProfileStore;
    chatsStore: ChatsStore;
    dialogStore: DialogStore;

    constructor() {
        this.authStore = new AuthStore(this);
        this.profileStore = new ProfileStore(this);
        this.chatsStore = new ChatsStore(this);
        this.dialogStore = new DialogStore(this);
    }
}