import {createI18n, I18nOptions, VueI18n} from "vue-i18n";
import {nextTick} from 'vue'

export const SUPPORT_LOCALES = ['en', 'fr']

export function setupI18n(options = {locale: 'en'}): VueI18n {
    const i18n: VueI18n = createI18n(options) as unknown as VueI18n
    setI18nLanguage(i18n, options.locale)
    return i18n
}

export function setI18nLanguage(i18n: VueI18n, locale) {
    i18n.locale = locale
    /**
     * NOTE:
     * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
     * The following is an example for axios.
     *
     * axios.defaults.headers.common['Accept-Language'] = locale
     */
    document.querySelector('html').setAttribute('lang', locale)
}

export async function loadLocaleMessages(i18n, locale) {
    // load locale messages with dynamic import
    const messages = await import(
        /* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`
        )

    i18n.setLocaleMessage(locale, messages.default)
    return nextTick()
}


export async function retrieveAvailableLocales(): Promise<string[]> {
    return SUPPORT_LOCALES;
}

