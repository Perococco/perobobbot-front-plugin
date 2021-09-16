export interface Bot {
    id: string;
    name: string;
    owner_login: string;
}

export enum IterationCommand {
    CONTINUE = 'CONTINUE',
    STOP = 'STOP'
}

export enum Nil {
    NIL = 'NIL'
}

export enum OS {
    LINUX = 'LINUX',
    POSIX_UNIX = 'POSIX_UNIX',
    WINDOWS = 'WINDOWS',
    MACOS = 'MACOS',
    UNKNOWN = 'UNKNOWN'
}

export enum OSInfo {
    INSTANCE = 'INSTANCE'
}

export enum Platform {
    TWITCH = 'Twitch',
    LOCAL = 'Local'
}

export enum PluginType {
    SECONDARY = 'SECONDARY',
    EXTENSION = 'EXTENSION',
    PRIMARY = 'PRIMARY',
    FRONT_FX = 'FRONT_FX'
}

export enum PointType {
    CREDIT = 'credit'
}

export enum Role {
    THE_BOSS = 'THE_BOSS',
    ADMINISTRATOR = 'ADMINISTRATOR',
    TRUSTED_USER = 'TRUSTED_USER',
    STANDARD_USER = 'STANDARD_USER',
    ANY_USER = 'ANY_USER'
}

export enum TokenType {
    CLIENT_TOKEN = 'client_token',
    USER_TOKEN = 'user_token'
}

export enum TransactionState {
    PENDING = 'pending',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
    DETACHED = 'detached'
}

export interface ViewerIdentity {
    id: string;
    login: string;
    platform: Platform;
    pseudo: string;
    viewer_id: string;
}

