import React, {FC} from 'react';
import {Image, ImageSourcePropType, TextStyle, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAppStyle, spacing} from '../../theme';
import {NavigatorParamList} from '../../navigators';
import {AppCard, Screen, Text} from '../../components';
import {TxKeyPath} from '../../i18n';

export const ServicesScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'services'>
> = ({navigation}) => {
  const appStyle = getAppStyle();

  const textStyles = {
    service: {
      ...appStyle.quicksand.bold,
      ...appStyle.secondaryTextColor,
      ...appStyle.textXXXL,
      textAlign: 'center',
      lineHeight: 40,
    } as TextStyle,
  };

  const items: {
    titleTx: TxKeyPath;
    onPress: () => void;
    imgSrc: ImageSourcePropType;
  }[] = [
    {
      titleTx: 'servicesScreen.rainbow',
      onPress: () => navigation.navigate('servicesRainbow'),
      imgSrc: require('../../../assets/img/servicios/servicio_1.jpg'),
    },
    {
      titleTx: 'servicesScreen.violeta',
      onPress: () => navigation.navigate('servicesVioleta'),
      imgSrc: require('../../../assets/img/servicios/servicio_2.jpg'),
    },
    {
      titleTx: 'servicesScreen.igualdad',
      onPress: () => navigation.navigate('servicesIgualdad'),
      imgSrc: require('../../../assets/img/servicios/servicio_3.jpg'),
    },
    {
      titleTx: 'servicesScreen.diversidad',
      onPress: () => navigation.navigate('servicesDiversidad'),
      imgSrc: require('../../../assets/img/servicios/servicio_4.jpg'),
    },
    {
      titleTx: 'servicesScreen.sanitario',
      onPress: () => navigation.navigate('servicesSanitarios'),
      imgSrc: require('../../../assets/img/servicios/servicio_5.jpg'),
    },
  ];

  return (
    <Screen
      preset="scroll"
      backgroundColor={appStyle.screen.backgroundColor}
      style={[appStyle.screen, {paddingBottom: 0}]}>
      <View style={{marginTop: spacing.xxsmall}}>
        {items.map(item => (
          <AppCard
            key={item.titleTx}
            onPress={item.onPress}
            style={{
              marginBottom: spacing.xlarge,
              paddingVertical: 0,
              paddingLeft: 0,
              paddingRight: 0,
              overflow: 'hidden',
              width: '100%',
              aspectRatio: 1.85,
            }}>
            <View style={{position: 'absolute', width: '100%', height: '100%'}}>
              <Image
                source={item.imgSrc}
                style={{width: '100%', height: '100%' /*resizeMode: "cover"*/}}
              />
            </View>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.35)',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={textStyles.service} tx={item.titleTx} />
            </View>
          </AppCard>
        ))}
      </View>
    </Screen>
  );
};
