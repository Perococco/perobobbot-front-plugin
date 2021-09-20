import type {Platform, ViewerIdentity} from './perobobbot-lang';

export interface CreateBotParameters {
    name: string;
}

export interface OAuthProcessParameter {
    platform: Platform;
    scopes: string[];
}

export interface RestUserToken {
    expiration_instant: string;
    id: string;
    owner_login: string;
    viewer_identity: ViewerIdentity;
}

