import * as React from "react"
import { View, ViewStyle } from "react-native"
import { spacing, AppStyle } from "../../theme"

interface CheckboxProps {
  // App styles object
  appStyle: AppStyle
  // checkbox checked flag
  value?: boolean
}

const ROOT: ViewStyle = {
  marginTop: spacing.small,
  width: spacing.xlarge,
  height: spacing.xlarge,
  borderWidth: 2,
  borderRadius: spacing.xxsmall,
  justifyContent:"center",
  alignItems:"center",
}

const CHECK: ViewStyle = {
  width: 14,
  height: 14,
  borderRadius: 2,
}

export const Checkbox = (props: CheckboxProps) => (
  <View style={[ROOT, {backgroundColor: props.appStyle.mainColor, borderColor: props.appStyle.oppositeColor}]}>
    {props.value && <View style={[CHECK, {backgroundColor: props.appStyle.oppositeColor}]}/> }
  </View>
)
