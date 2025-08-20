import { getLocales } from "react-native-localize"
import { I18n } from "i18n-js"
import en from "./locales/en.json"
import es from "./locales/es.json"
import ca from "./locales/ca.json"

const translations = { en, es, ca }
export const i18n = new I18n(translations)

i18n.enableFallback = true
i18n.defaultLocale = "en"
i18n.missingTranslation = {
  get: () => ''
}

const locales = getLocales();
export let country = null;

if (Array.isArray(locales)) {
  i18n.locale = locales[0].languageCode;
  country = locales[0].countryCode;
}

if(!translations.hasOwnProperty(i18n.locale)) {
  // si el locale no existe, ponemos el default
  i18n.locale = i18n.defaultLocale;
}

export const setLocale = (locale: string) => {
  i18n.locale = locale;
}

/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
type DefaultLocale = typeof en
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & string]
