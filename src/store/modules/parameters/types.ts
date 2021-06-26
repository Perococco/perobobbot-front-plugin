import {ActionContext} from "vuex";
import RootState from "../../root-state";
import {VueI18n} from "vue-i18n";


export class LocaleInfo {
    name: string;
    loaded: boolean;
    constructor(name: string, loaded: boolean) {
        this.name = name;
        this.loaded = loaded;
    }
    public setLoaded():void {
        this.loaded = true;
    }
}

export enum ParametersGetters {
    AVAILABLE_LOCALES = 'availableLocales',
    CURRENT_LOCALE = 'currentLocale',
    LOCALE_INFOS = 'localesInfos',
}

export enum ParametersMutations {
    SET_CURRENT_LOCALE = 'SET_CURRENT_LOCALE',
    SET_LOCALE_INFOS = 'SET_LOCALE_INFOS',
    SET_LOCALE_LOADED = 'SET_LOCALE_LOADED',
}

export enum ParametersActions {
    SET_CURRENT_LOCALE = 'setLocale',
    INITIALIZE_I18N = 'initializeI18n',
}

export interface ParametersState {
    currentLocale: string,
    localeInfos: Map<string, LocaleInfo>,
}


export interface SetLocaleParameter {
    locale: string,
    i18n: VueI18n,
}

export type ParamsActionContext = ActionContext<ParametersState, RootState>

