export interface UpdateProfileRequest {
    avatar?: Blob;
    login: string;
    aboutMe: string;
}