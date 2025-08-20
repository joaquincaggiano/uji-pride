import * as React from "react"
import { Pressable, PressableProps, ViewStyle } from "react-native"
import { light } from "../../theme"

interface ButtonProps extends PressableProps {
  // An optional style for the button.
  style?: ViewStyle
}

export function AppCard(props: ButtonProps) {
  const {
    style: customStyle,
    children,
    ...rest
  } = props

  const style: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    paddingLeft: 20,
    paddingRight: 12,
    paddingVertical: 12,
    backgroundColor: light.mainColor,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    
    elevation: 4,
    ...customStyle,
  }

  return (
    <Pressable style={({ pressed }) => [style, pressed && {opacity: 0.6}]} {...rest}>
      {children}
    </Pressable>   
  )
}
