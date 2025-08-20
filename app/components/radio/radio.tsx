import * as React from "react"
import { View, ViewStyle } from "react-native"
import { spacing, AppStyle } from "../../theme"

interface RadioProps {
  // App styles object
  appStyle: AppStyle
  // container style
  style?: ViewStyle
  // radio checked flag
  value?: boolean
}

const ROOT: ViewStyle = {
  width: spacing.xlarge,
  height: spacing.xlarge,
  borderWidth: 2,
  borderRadius: spacing.xlarge,
  justifyContent:"center",
  alignItems:"center",
}

const CHECK: ViewStyle = {
  width: 14,
  height: 14,
  borderRadius: 14,
}

export const Radio = (props: RadioProps) => (
  <View style={[ROOT, {backgroundColor: props.appStyle.mainColor, borderColor: props.appStyle.oppositeColor, ...props.style}]}>
    {props.value && <View style={[CHECK, {backgroundColor: props.appStyle.oppositeColor}]}/> }
  </View>
)
