import { TxKeyPath, i18n } from "./i18n"
import I18n from "i18n-js"

/**
 * Translates text.
 *
 * @param key The i18n key.
 */
export function translate(key: TxKeyPath, options?: I18n.TranslateOptions) {
  return key ? i18n.t(key, options) : undefined
}
