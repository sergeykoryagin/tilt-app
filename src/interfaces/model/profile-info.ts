export interface ProfileInfo {
    userId: string;
    login: string;
    aboutMe?: string;
    avatar?: ArrayBuffer | string;
}

export const profileInfo1: ProfileInfo = {
    userId: 'awbfawfawf9awf9awf7awf79',
    login: 'sergey_koryagin',
    aboutMe: 'kek',
};
export const profileInfo2: ProfileInfo = {
    userId: 'qwdqmwd',
    login: 'memento_mori',
    aboutMe: 'kek',
};
export const profileInfo3: ProfileInfo = {
    userId: 'qwdalkwdnalkqmwd',
    login: 'rizzleduq',
    aboutMe: 'kek',
};