import { AuthStore } from 'stores/auth-store';
import { ChatsStore } from 'stores/chats-store';
import { ErrorStore } from 'stores/error-store';
import { PermissionsStore } from 'stores/permissions-store';
import { ProfileStore } from 'stores/profile-store';
import { SearchStore } from 'stores/searchStore';
import { SocketConnectionStore } from 'stores/socket-connection-store';

export class Stores {
    authStore: AuthStore;
    profileStore: ProfileStore;
    chatsStore: ChatsStore;
    searchStore: SearchStore;
    socketConnectionStore: SocketConnectionStore;
    errorStore: ErrorStore;
    permissionsStore: PermissionsStore;

    constructor() {
        this.authStore = new AuthStore(this);
        this.profileStore = new ProfileStore(this);
        this.chatsStore = new ChatsStore(this);
        this.searchStore = new SearchStore(this);
        this.socketConnectionStore = new SocketConnectionStore(this);
        this.errorStore = new ErrorStore(this);
        this.permissionsStore = new PermissionsStore(this);
    }
}