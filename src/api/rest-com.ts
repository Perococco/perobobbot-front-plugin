import type {Platform, PlatformUser} from './perobobbot-lang';

export interface CreateBotParameters {
    name: string;
}

export interface OAuthProcessParameter {
    platform: Platform;
}

export interface RestUserToken {
    expiration_instant: string;
    id: string;
    owner_login: string;
    platform_user: PlatformUser;
}

