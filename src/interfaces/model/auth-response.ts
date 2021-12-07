import { UserInfo } from 'interfaces/model/user-info';
import { TokenPair } from 'interfaces/model/token-pair';

export interface AuthResponse {
    tokenPair: TokenPair;
    userInfo: UserInfo;
}