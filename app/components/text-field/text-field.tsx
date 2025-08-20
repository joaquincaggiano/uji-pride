import React, { LegacyRef } from "react"
import { StyleProp, TextInput, TextInputProps, TextStyle, ViewStyle } from "react-native"
import { translate, TxKeyPath } from "../../i18n"
import { spacing, light } from "../../theme"


interface TextFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: TxKeyPath
  /**
  * Ref to forward to the TextInput component.
  * */
  forwardedRef?: LegacyRef<TextInput>
}

/**
 * This component is a HOC over the built-in React Native one. A TextInput that manages the PlaceHolder text.
 */
export function TextField(props: TextFieldProps) {
  const {
    placeholderTx,
    placeholder,
    placeholderTextColor = light.mainTextColor.color,
    forwardedRef,
    style: customStyle,
    ...rest
  } = props

  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  const style: StyleProp<TextStyle> = {
    backgroundColor: light.secondaryColor,
    color: light.mainTextColor.color,
    width: "100%",
    fontSize: light.textS.fontSize,
    paddingVertical: spacing.xxsmall,
    paddingHorizontal: spacing.small,
    fontFamily: light.quicksand.semibold.fontFamily,
    borderRadius: spacing.xsmall,
    ...customStyle as ViewStyle,
  }

  return (
    <TextInput
      placeholder={actualPlaceholder}
      placeholderTextColor={placeholderTextColor}
      underlineColorAndroid={"rgba(0, 0, 0, 0)"}
      ref={forwardedRef}
      style={style}
      {...rest}
    />
  )
}
