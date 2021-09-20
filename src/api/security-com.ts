export interface ChangePasswordParameters {
    new_password: string;
    password: string;
}

export interface Credential {
    login: string;
    password: string;
}

export enum IdentificationMode {
    PASSWORD = 'password',
    OPEN_ID = 'openid'
}

export interface JwtInfo {
    token: string;
    user: SimpleUser;
}

export interface OAuthInfo {
    oauth_uri: string;
    sign_in_id: string;
}

export enum Operation {
    READ_CREDENTIALS = 'READ_CREDENTIALS'
}

export interface Role {
    operations: Operation[];
    role_kind: RoleKind;
}

export enum RoleKind {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface SimpleUser {
    deactivated: boolean;
    identification_mode: IdentificationMode;
    locale: string;
    login: string;
    roles: RoleKind[];
}

