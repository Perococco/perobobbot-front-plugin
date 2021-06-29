import {
    LocaleInfo,
    ParametersActions,
    ParametersGetters,
    ParametersMutations,
    ParametersState,
    ParamsActionContext,
    SetLocaleParameter
} from "./types";
import {Module} from "vuex";
import RootState from "@/store/root-state";
import {ExportedGlobalComposer, I18n, VueI18n} from "vue-i18n";
import {loadLocaleMessages, retrieveAvailableLocales, setI18nLanguage} from "../../../i18n/i18nTools";

const ParameterModule: Module<ParametersState, RootState> = {
    namespaced: true,
    state: {
        currentLocale: "",
        localeInfos: new Map(),
    },
    getters: {
        [ParametersGetters.CURRENT_LOCALE]: (state): string => state.currentLocale,
        [ParametersGetters.LOCALE_INFOS]: (state): Map<string, LocaleInfo> => state.localeInfos,
        [ParametersGetters.AVAILABLE_LOCALES]: (state): string[] => Array.from(state.localeInfos.keys())
    },
    mutations: {
        [ParametersMutations.SET_CURRENT_LOCALE](state: ParametersState, locale: string) {
            state.currentLocale = locale;
        },
        [ParametersMutations.SET_LOCALE_INFOS](state: ParametersState, locales: string[]) {
            for (const locale of locales) {
                state.localeInfos.set(locale, new LocaleInfo(locale, false))
            }
        },
        [ParametersMutations.SET_LOCALE_LOADED](state: ParametersState, loadedLocale: string) {
            const info = state.localeInfos.get(loadedLocale);
            if (info) { //d'après Lumikkode
                info.loaded = true
            }
        },
    },
    actions: {
        async [ParametersActions.SET_CURRENT_LOCALE](context: ParamsActionContext, parameter: SetLocaleParameter) {
            const locale = parameter.locale;
            const i18n = parameter.i18n;

            const info = context.state.localeInfos.get(locale);
            const loaded = info && info.loaded

            if (!loaded) {
                const messages = await loadLocaleMessages(locale);
                i18n.setLocaleMessage(locale, messages);
                context.commit(ParametersMutations.SET_LOCALE_LOADED, locale);
            }

            setI18nLanguage(i18n, locale);
            context.commit(ParametersMutations.SET_CURRENT_LOCALE, locale)
        },

        async [ParametersActions.INITIALIZE_I18N](context: ParamsActionContext, i18n: VueI18n |  ExportedGlobalComposer) {
            const availableLocales = await retrieveAvailableLocales();
            context.commit(ParametersMutations.SET_LOCALE_INFOS, availableLocales);
            //todo retrieve previously selected locale from localStorage.
            await context.dispatch(ParametersActions.SET_CURRENT_LOCALE, {locale: "en", i18n: i18n});

        }

    }

};

export default ParameterModule;

