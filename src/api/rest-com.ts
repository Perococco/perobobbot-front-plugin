import type {Platform, Scope, ViewerIdentity} from './perobobbot-lang';

export interface CreateBotParameters {
  name: string;
}

export interface OAuthProcessParameter {
  platform: Platform;
  scopes: Scope[];
}

export interface RestUserToken {
  expiration_instant: string;
  id: string;
  owner_login: string;
  viewer_identity: ViewerIdentity;
}

