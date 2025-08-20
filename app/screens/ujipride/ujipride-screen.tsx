import React, {FC} from 'react';
import {
  Image,
  Linking,
  Pressable,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAppStyle, spacing} from '../../theme';
import {NavigatorParamList} from '../../navigators';
import {AppButton, Screen, Text} from '../../components';
import InstagramIcon from '../../../assets/icons/logo-instagram.svg';

const INSTAGRAM_URL = 'https://www.instagram.com/uji_pride/';
const IMG_SRC = require('../../../assets/img/Inicio/grupo_ujipride_1.jpg');

export const UjiprideScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'ujipride'>
> = ({navigation}) => {
  const appStyle = getAppStyle();

  const textStyles = {
    description: {
      ...appStyle.poppins.regular,
      ...appStyle.mainTextColor,
      ...appStyle.textS,
    },
    seeMore: {
      ...appStyle.quicksand.semibold,
      ...appStyle.mainTextColor,
      ...appStyle.textS,
    },
    textJoin: {
      ...appStyle.quicksand.semibold,
      ...appStyle.mainTextColor,
      // ...appStyle.textXS,
    },
  };

  const openInstagram = () => {
    Linking.openURL(INSTAGRAM_URL);
  };

  const openEmail = () => {
    const email = 'diversitatlgtbi@uji.es';
    // const subject = 'Quiero conocer más sobre UJIPride';
    // const body = 'Escriba aquí sus dudas';

    const mailtoURL = `mailto:${email}`;
    // const mailtoURL = `mailto:${email}?subject=${subject}&body=${body}`;

    Linking.openURL(mailtoURL).catch(error => {
      console.log(error);
    });
  };

  const images = [
    require('../../../assets/img/UJI-Pride/ujipride_1.jpeg'),
    require('../../../assets/img/UJI-Pride/ujipride_2.jpeg'),
    require('../../../assets/img/UJI-Pride/ujipride_3.jpeg'),
    require('../../../assets/img/UJI-Pride/ujipride_4.jpeg'),
  ];

  return (
    <Screen
      preset="scroll"
      backgroundColor={appStyle.screen.backgroundColor}
      style={[appStyle.screen, {paddingHorizontal: 0}]}>
      <View style={{paddingHorizontal: spacing.medium}}>
        <View
          style={{width: '66%', alignSelf: 'center', aspectRatio: 1.49981692}}>
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
            tx="ujiprideScreen.description"
            style={textStyles.description}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          marginTop: spacing.xxlarge,
          marginHorizontal: 2,
          marginBottom: spacing.xxlarge,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {images.map((image, index) => (
          <View
            style={{width: '33.33%', aspectRatio: 1, padding: 2}}
            key={index}>
            <Image
              source={image}
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            />
          </View>
        ))}
        <Pressable
          onPress={openInstagram}
          style={{
            width: '33.33%',
            aspectRatio: 1,
            padding: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text tx="ujiprideScreen.seeMore" style={textStyles.seeMore} />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
          alignItems: 'center',
          marginVertical: spacing.small,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            tx="ujiprideScreen.textJoin"
            style={{
              ...textStyles.textJoin,
              marginBottom: spacing.small,
              fontSize: 11.5,
            }}
          />
          <AppButton
            titleTx="ujiprideScreen.join"
            onPress={openEmail}
            style={{
              width: 135,
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </View>

        <AppButton
          title={'Instagram'}
          onPress={openInstagram}
          style={{
            width: 135,
            height: 45,
            justifyContent: 'center',
            marginTop: 29,
          }}
          iconComponent={<InstagramIcon width={24} height={24} />}
        />
      </View>
    </Screen>
  );
};
