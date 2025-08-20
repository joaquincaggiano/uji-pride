import React, { ErrorInfo } from "react"
import { View, ViewStyle, ScrollView } from "react-native"
import { light as styles, spacing } from "../../theme"
import { AppButton, Text } from "../../components"

const CONTAINER: ViewStyle = {
  alignItems: "center",
  flex: 1,
  padding: spacing.large,
  backgroundColor: styles.screen.backgroundColor,
  paddingTop: spacing.xhuge
}

const ERROR_DETAILS_CONTAINER: ViewStyle = {
  maxHeight: "60%",
  width: "100%",
  paddingHorizontal: spacing.xsmall,
  marginVertical: spacing.medium,
  paddingBottom: spacing.medium,
}

export interface ErrorComponentProps {
  error: Error
  errorInfo: ErrorInfo
  onReset(): void
}


export const ErrorComponent = (props: ErrorComponentProps) => {

  return (
    <View style={CONTAINER}>
      <Text style={[styles.quicksand.bold, styles.textXL, styles.mainTextColor]} tx={"errorScreen.title"} />
      <Text style={[styles.quicksand.medium, styles.textL, styles.mainTextColor, {marginTop: spacing.large}]} tx={"errorScreen.subtitle"} />
      <View style={ERROR_DETAILS_CONTAINER}>
        <ScrollView>
          <Text selectable style={[styles.poppins.regular, styles.mainTextColor, {paddingVertical: spacing.small}]} text={`${props.error}`} />
        </ScrollView>
      </View>

      <AppButton titleTx={"errorScreen.reset"} onPress={props.onReset} />

    </View>
  )
}
