import React, {FC} from 'react';
import {
  Image,
  Linking,
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAppStyle, spacing} from '../../../theme';
import {NavigatorParamList} from '../../../navigators';
import {AppButton, AppWebView, Screen, Text} from '../../../components';
import EmailIcon from '../../../../assets/icons/mail-outline.svg';
import PhoneIcon from '../../../../assets/icons/call-outline.svg';

const EMAIL = 'unitat-igualtat@uji.es';
const PHONE = '+34 964 729 039';
const WEB_URL = 'https://www.uji.es/serveis/ui/';
const MAP_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d369.33863321342506!2d-0.06853741584680495!3d39.99533802120134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5fffbd2a7e7bc3%3A0xfa43f2f18bd8c8c!2sRectorado%20UJI!5e0!3m2!1ses!2ses!4v1696517046662!5m2!1ses!2ses';
const IMG_SRC = require('../../../../assets/img/servicios/logoServicios/logo_servicio_3.jpg');

export const ServicesIgualdadScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'servicesIgualdad'>
> = ({navigation}) => {
  const appStyle = getAppStyle();

  const textStyles = {
    description: {
      ...appStyle.poppins.regular,
      ...appStyle.mainTextColor,
      ...appStyle.textS,
    },
    subtitle: {
      ...appStyle.poppins.medium,
      ...appStyle.mainTextColor,
      ...appStyle.textM,
    },
    contactInfo: {
      ...appStyle.poppins.medium,
      ...appStyle.mainTextColor,
      ...appStyle.textS,
    },
  };

  const onPressVisitWeb = () => {
    Linking.openURL(WEB_URL);
  };

  const onPressEmail = () => {
    Linking.openURL(`mailto:${EMAIL}`);
  };

  const onPressPhone = () => {
    Linking.openURL(`tel:${PHONE}`);
  };

  const webviewSource = {
    html: `<iframe src="${MAP_URL}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`,
  };

  const contactPressableStyles = ({pressed}: PressableStateCallbackType) =>
    ({
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.xxsmall,
      opacity: pressed ? 0.6 : 1,
    } as StyleProp<ViewStyle>);

  return (
    <Screen
      preset="scroll"
      backgroundColor={appStyle.screen.backgroundColor}
      style={[appStyle.screen, {paddingBottom: 0}]}>
      <View style={{width: '66%', alignSelf: 'center', aspectRatio: 1.1374269}}>
        <Image
          source={IMG_SRC}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            borderRadius: 12,
          }}
        />
      </View>

      <View style={{marginTop: spacing.xxlarge}}>
        <Text
          tx="servicesIgualdadScreen.description"
          style={textStyles.description}
        />
      </View>

      <View style={{marginTop: spacing.xxlarge}}>
        <Text tx="common.contact" style={textStyles.subtitle} />

        <Pressable style={contactPressableStyles} onPress={onPressEmail}>
          <EmailIcon
            width={17}
            height={17}
            style={{marginRight: spacing.small}}
          />
          <Text text={EMAIL} style={textStyles.contactInfo} />
        </Pressable>

        <Pressable style={contactPressableStyles} onPress={onPressPhone}>
          <PhoneIcon
            width={17}
            height={17}
            style={{marginRight: spacing.small}}
          />
          <Text text={PHONE} style={textStyles.contactInfo} />
        </Pressable>
      </View>

      <View
        style={{
          flex: 1,
          marginTop: spacing.xxlarge,
          width: '100%',
          aspectRatio: 1.5,
          borderRadius: 12,
          overflow: 'hidden',
        }}>
        <AppWebView
          source={webviewSource}
          automaticallyAdjustContentInsets={false}
          scrollEnabled={false}
        />
        <View style={{position: "absolute", bottom: spacing.large, alignSelf: "center"}}>
          <Text text="RR0103SDSD" style={textStyles.subtitle} />
        </View>
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginVertical: spacing.xxlarge,
        }}>
        <AppButton titleTx={'common.visitWeb'} onPress={onPressVisitWeb} />
      </View>
    </Screen>
  );
};
