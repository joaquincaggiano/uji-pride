import * as React from "react"
import { Dimensions } from "react-native"
import Modal from "react-native-modal"

interface AppModalProps {
  children: React.ReactNode
  visible: boolean
  onPressOutside?: () => void
  animationOutTiming?: number
}
const {height, width} = Dimensions.get('screen');

export const AppModal = (props: AppModalProps) => {
  return (
    <Modal
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      animationOutTiming={props.animationOutTiming}
      isVisible={props.visible}
      onBackButtonPress={props.onPressOutside}
      onBackdropPress={props.onPressOutside}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      deviceHeight={height}
      deviceWidth={width}
      statusBarTranslucent
      avoidKeyboard>
      {props.children}
    </Modal>
  )
}