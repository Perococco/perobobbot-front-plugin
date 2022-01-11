export interface Bot {
    id: string;
    name: string;
    owner_login: string;
}

export interface DiscordUser extends PlatformUser {
    discriminator: string;
    id: string;
    login: string;
    readonly   platform: Platform;
    readonly   pseudo: string;
    user_id: string;
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
    DISCORD = 'Discord',
    SPOTIFY = 'Spotify',
    LOCAL = 'Local'
}

export interface PlatformUser {
    readonly   id: string;
    readonly   login: string;
    readonly   platform: Platform;
    readonly   pseudo: string;
    readonly   user_id: string;
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

export enum RandomString {
    INSTANCE = 'INSTANCE'
}

export enum Role {
    THE_BOSS = 'THE_BOSS',
    ADMINISTRATOR = 'ADMINISTRATOR',
    TRUSTED_USER = 'TRUSTED_USER',
    STANDARD_USER = 'STANDARD_USER',
    ANY_USER = 'ANY_USER'
}

export interface SafeClient {
    client_id: string;
    id: string;
    platform: Platform;
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

export interface TwitchUser extends PlatformUser {
    id: string;
    login: string;
    readonly   platform: Platform;
    pseudo: string;
    user_id: string;
}

export interface UserIdentification {
    id: string;
    platform_users: { [key: string]: PlatformUser };
}

