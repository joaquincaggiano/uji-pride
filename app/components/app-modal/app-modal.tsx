import * as React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from 'react-native';

interface AppModalProps {
  children: React.ReactNode;
  visible: boolean;
  onPressOutside?: () => void;
  animationOutTiming?: number;
}

const { height, width } = Dimensions.get('screen');

export const AppModal = (props: AppModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onPressOutside}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={props.onPressOutside}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.content}>{props.children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    margin: 20,
    maxWidth: width - 40,
    maxHeight: height - 40,
  },
});
