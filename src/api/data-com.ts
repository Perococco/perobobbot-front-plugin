import type {Bot, Platform} from './perobobbot-lang';
import type {Authentication} from './security-com';

export interface BotExtension {
    bot: Bot;
    enabled: boolean;
    extension: Extension;
}

export interface CreateClientParameter {
    client_id: string;
    client_secret: any;
    platform: Platform;
}

export interface CreateUserParameters {
    authentication: Authentication;
    login: string;
}

export interface Extension {
    activated: boolean;
    available: boolean;
    id: string;
    name: string;
}

export enum PromotionManager {
    INSTANCE = 'INSTANCE'
}

export interface UpdateBotExtensionParameters {
    enabled: boolean | null;
}

export interface UpdateExtensionParameters {
    activated: boolean | null;
}

export interface UpdateUserParameters {
    language_tag: string | string | null;
}

