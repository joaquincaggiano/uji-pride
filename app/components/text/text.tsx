import * as React from "react"
import { Text as ReactNativeText, TextProps as TextProperties, } from "react-native"
import { translate, TxKeyPath } from "../../i18n"
import I18n from "i18n-js"

interface TextProps extends TextProperties {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: I18n.TranslateOptions
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
}

/**
 * This component is a HOC over the built-in React Native one. It manages the i18n translations.
 */
export function Text(props: TextProps) {
  // grab the props
  const { tx, txOptions, text, children, ...rest } = props

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <ReactNativeText {...rest}>
      {content}
    </ReactNativeText>
  )
}
