import { ProfileInfo } from 'interfaces/model/profile-info';
import { TokenPair } from 'interfaces/model/token-pair';

export interface AuthResponse {
    tokenPair: TokenPair;
    profileInfo: ProfileInfo;
}