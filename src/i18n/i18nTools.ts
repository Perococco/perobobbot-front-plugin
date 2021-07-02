import {createI18n, I18nOptions, VueI18n} from "vue-i18n";

import {I18nController} from "../api/rest-controller";

const i18nController = new I18nController();

export async function retrieveAvailableLocales(): Promise<string[]> {
    return i18nController.getAvailableLanguageTags();
}

export function setupI18n(options:I18nOptions = {locale: 'en'}):VueI18n {
    const i18n:VueI18n = createI18n(options) as unknown as VueI18n
    setI18nLanguage(i18n, options.locale)
    return i18n
}

export function setI18nLanguage(i18n: VueI18n, locale: string) {
    i18n.locale = locale
    /**
     * NOTE:
     * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
     * The following is an example for axios.
     *
     */
    // axios.defaults.headers.common['Accept-Language'] = locale;
    // document.querySelector('html').setAttribute('lang', locale);
}

export async function loadLocaleMessages(locale: string): Promise<{ [key: string]: string }> {
    // load locale messages with dynamic import
    return i18nController.getDictionary(locale);
}

//export default i18n;
