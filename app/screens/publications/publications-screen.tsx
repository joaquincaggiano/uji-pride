import React, {FC, useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAppStyle, spacing} from '../../theme';
import {NavigatorParamList} from '../../navigators';
import {AppModal, AppWebView, Screen, Text} from '../../components';
import {BackHandler, Platform, Pressable, View} from 'react-native';
import ShareIcon from '../../../assets/icons/information-circle-outline.svg';
import CloseIcon from '../../../assets/icons/close.svg';

const UJI_PUBLICATIONS_URL = 'https://repositori.uji.es/xmlui/';

export const PublicationsScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'publications'>
> = ({navigation}) => {
  const appStyle = getAppStyle();
  const textStyles = {
    titleModal: {
      ...appStyle.quicksand.bold,
      ...appStyle.mainTextColor,
      ...appStyle.textL,
    },
    bodyModal: {
      ...appStyle.quicksand.medium,
      ...appStyle.mainTextColor,
      ...appStyle.textM,
      lineHeight: 20,
    }
  };

  const [openModal, setOpenModal] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{top: 4}}>
          <Pressable onPress={() => setOpenModal(true)}>
            <ShareIcon width={24} height={24} />
          </Pressable>
        </View>
      ),
    });
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onAndroidBackPress,
        );
      };
    }
  }, []);

  const webViewRef = useRef(null);
  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      //@ts-ignore
      webViewRef.current.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  };

  const source = {
    uri: UJI_PUBLICATIONS_URL,
  };

  const INJECTED_JAVASCRIPT = `(function() {
    const cookieBanner = document.getElementById("overbox3")
    if (cookieBanner) {
      cookieBanner.remove()
    }
  })();`;

  return (
    <Screen
      preset="fixed"
      backgroundColor={appStyle.screen.backgroundColor}
      style={[
        appStyle.screen,
        {paddingHorizontal: 0, paddingBottom: 0, paddingTop: spacing.xxsmall},
      ]}>
      <AppModal visible={openModal} onPressOutside={() => setOpenModal(false)}>
        <View
          style={{
            alignSelf: 'center',
            width: "90%",
            backgroundColor: 'white',
            borderRadius: 10,
            padding: spacing.large,
          }}>
          <Pressable
            onPress={() => setOpenModal(false)}
            style={{flexDirection: 'row-reverse'}}>
            <CloseIcon
              width={24}
              height={24}
            />
          </Pressable>
          <View style={{paddingHorizontal: 10, paddingBottom: spacing.xxlarge}}>
            <Text
              style={{
                ...textStyles.titleModal,
                marginBottom: spacing.medium,
              }}
              tx="publicationsScreen.modalTitle"
            />
            <Text
              style={textStyles.bodyModal}
              tx="publicationsScreen.modalBody"
            />
          </View>
        </View>
      </AppModal>
      <AppWebView
        source={source}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        forwardedRef={webViewRef}
      />
    </Screen>
  );
};
