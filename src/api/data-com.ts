import type {Bot} from './perobobbot-lang';

export interface BotExtension {
    bot: Bot;
    enabled: boolean;
    extension: Extension;
}

export interface CreateUserParameters {
    identification: any;
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

