import * as React from "react"
import { Pressable, PressableProps, TextStyle, ViewStyle } from "react-native"
import { Text } from "../text/text"
import { TxKeyPath } from "../../i18n"
import { light as styles, palette, spacing } from "../../theme"

export enum AppButtonTheme {
  primary,
  secondary,
}

interface ButtonProps extends PressableProps {
  style?: ViewStyle
  theme?: AppButtonTheme
  title?: string
  titleTx?: TxKeyPath
  iconComponent?: React.ReactNode
}

/**
 * This component is a HOC over the built-in React Native one.
 */
export function AppButton(props: ButtonProps) {
  const {
    style: customStyle,
    theme = AppButtonTheme.primary,
    title,
    titleTx,
    ...rest
  } = props

  const style: ViewStyle = {
    flexDirection: "row",
    borderRadius: 8,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    backgroundColor: theme === AppButtonTheme.primary ? palette.black : palette.darkGrey,
    ...customStyle,
  }

  const textStyle: TextStyle = {
    ...styles.quicksand.semibold,
    ...styles.textM,
    color: theme === AppButtonTheme.primary ? palette.white : palette.black,
    marginLeft: props.iconComponent ? 8 : 0,
    textAlign: 'center'
  }

  return (
    <Pressable style={({ pressed }) => [style, pressed && {opacity: 0.6}]} {...rest}>
      {props.iconComponent}
      <Text
        style={textStyle}
        tx={titleTx}
        text={title}
      />
    </Pressable>   
  )
}
