import React, {FC, useEffect} from 'react';
import {Image, ImageSourcePropType, Pressable, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAppStyle, spacing} from '../../theme';
import {NavigatorParamList, forceUpdateAppStack} from '../../navigators';
import {AppCard, Screen, Text} from '../../components';
import RNBootSplash from 'react-native-bootsplash';
import {TxKeyPath, setLocale, i18n} from '../../i18n';
import {useStores} from '../../models';
import {observer} from 'mobx-react-lite';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const IMG_STYLE = {
  width: 65,
  height: 65,
  borderRadius: 65,
};

const LANGS = {
  es: 'CAS',
  ca: 'VAL',
  en: 'ENG',
};

export const HomeScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'home'>
> = observer(({navigation}) => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  const insets = useSafeAreaInsets();
  const {appData} = useStores();
  const appStyle = getAppStyle();

  const textStyles = {
    menu: {
      ...appStyle.quicksand.bold,
      ...appStyle.mainTextColor,
      ...appStyle.textXL,
    },
  };

  const items: {
    titleTx: TxKeyPath;
    onPress: () => void;
    imgSrc: ImageSourcePropType;
  }[] = [
    {
      titleTx: 'homeScreen.services',
      onPress: () => navigation.navigate('services'),
      imgSrc: require('../../../assets/img/Inicio/servicios.jpg'),
    },
    {
      titleTx: 'homeScreen.ujipride',
      onPress: () => navigation.navigate('ujipride'),
      imgSrc: require('../../../assets/img/Inicio/grupo_ujipride_1.jpg'),
    },
    {
      titleTx: 'homeScreen.protocols',
      onPress: () => navigation.navigate('protocols'),
      imgSrc: require('../../../assets/img/Inicio/protocolos.jpg'),
    },
    {
      titleTx: 'homeScreen.publications',
      onPress: () => navigation.navigate('publications'),
      imgSrc: require('../../../assets/img/Inicio/publicaciones.jpg'),
    },
    {
      titleTx: 'homeScreen.resources',
      onPress: () => navigation.navigate('resources'),
      imgSrc: require('../../../assets/img/Inicio/recursos.jpg'),
    },
    {
      titleTx: 'homeScreen.glossary',
      onPress: () => navigation.navigate('glossary'),
      imgSrc: require('../../../assets/img/Inicio/glosario_1.jpg'),
    },
    {
      titleTx: 'homeScreen.game',
      onPress: () => navigation.navigate('game'),
      imgSrc: require('../../../assets/img/Inicio/pasapalabra_1.jpg'),
    },
  ];

  const changeLocale = () => {
    if (appData.locale === 'es') {
      setLocale('ca');
      appData.setLocale('ca');
    } else if (appData.locale === 'ca') {
      setLocale('en');
      appData.setLocale('en');
    } else {
      setLocale('es');
      appData.setLocale('es');
    }
    forceUpdateAppStack()
  }

  return (
    <Screen
      preset="scroll"
      backgroundColor={appStyle.screen.backgroundColor}
      style={[
        appStyle.screen,
        insets.top > 0 && {paddingTop: spacing.xsmall + insets.top},
      ]}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: spacing.xsmall,
        }}>
        <View style={{flex: 1}}>
          <Image
            source={require('../../../assets/icon.png')}
            style={{width: 124, height: 20.984}}
          />
        </View>
        <Pressable
          style={({pressed}) => ({opacity: pressed ? 0.6 : 1})}
          onPress={changeLocale}>
          <Text style={{...textStyles.menu, top: 1, right: 3}}>
            {LANGS[appData.locale as 'es' | 'ca' | 'en']}
          </Text>
        </Pressable>
      </View>

      <View style={{marginTop: spacing.huge}}>
        {items.map(item => (
          <AppCard
            key={item.titleTx}
            onPress={item.onPress}
            style={{marginBottom: spacing.xxlarge}}>
            <View style={{flex: 1}}>
              <Text style={textStyles.menu} tx={item.titleTx} />
            </View>
            <Image
              source={item.imgSrc}
              style={IMG_STYLE}
            />
          </AppCard>
        ))}
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginVertical: spacing.small,
          paddingHorizontal: spacing.tiny,
        }}>
        <Image
          source={require('../../../assets/img/marca-uji.png')}
          style={{width: 131, height: 24}}
        />
        {i18n.locale === 'ca' ? (
          <Image
            source={require('../../../assets/img/conselleria_val.png')}
            style={{width: 134.513, height: 80}}
          />
        ) : (
          <Image
            source={require('../../../assets/img/conselleria_cas.png')}
            style={{width: 134.513, height: 80}}
          />
        )}
        
      </View>
    </Screen>
  );
});
