import React, {FC} from 'react';
import {Image, ImageSourcePropType, TextStyle, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAppStyle, spacing} from '../../theme';
import {NavigatorParamList} from '../../navigators';
import {AppCard, Screen, Text} from '../../components';
import {TxKeyPath} from '../../i18n';

export const ProtocolsScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'protocols'>
> = ({navigation}) => {
  const appStyle = getAppStyle();

  const textStyles = {
    description: {
      ...appStyle.poppins.regular,
      ...appStyle.mainTextColor,
      ...appStyle.textS,
    },
    protocol: {
      ...appStyle.quicksand.bold,
      ...appStyle.secondaryTextColor,
      ...appStyle.textXXL,
      textAlign: 'center',
      lineHeight: 35,
    } as TextStyle,
  };

  const items: {
    titleTx: TxKeyPath;
    txKey: string;
    url: string;
    imgSrc: ImageSourcePropType;
  }[] = [
    {
      titleTx: 'protocolsScreen.protocol1',
      txKey: 'protocol1',
      url: 'https://www.uji.es/serveis/ui/base/arxiu/docs/informes/protocol/',
      imgSrc: require('../../../assets/img/Protocolos/protocolo_1.jpg'),
    },
    {
      titleTx: 'protocolsScreen.protocol2',
      txKey: 'protocol2',
      url: 'https://www.uji.es/serveis/ui/destacat/normativa-canvi-nom/',
      imgSrc: require('../../../assets/img/Protocolos/protocolo_2.jpg'),
    },
  ];

  return (
    <Screen
      preset="scroll"
      backgroundColor={appStyle.screen.backgroundColor}
      style={appStyle.screen}>
      {/* <View>
        <Text style={textStyles.description} tx="protocolsScreen.description" />
      </View> */}

      <View style={{marginTop: spacing.xlarge}}>
        {items.map(item => (
          <AppCard
            key={item.titleTx}
            onPress={() =>
              navigation.navigate('protocolsDetail', {
                txKey: item.txKey,
                url: item.url,
              })
            }
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
              <Text style={textStyles.protocol} tx={item.titleTx} />
            </View>
          </AppCard>
        ))}
      </View>
    </Screen>
  );
};
