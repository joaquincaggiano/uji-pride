import React, {FC} from 'react';
import {ImageSourcePropType, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAppStyle, spacing} from '../../theme';
import {NavigatorParamList} from '../../navigators';
import {AppCard, Screen, Text} from '../../components';
import {TxKeyPath} from '../../i18n';
import DocIcon from '../../../assets/icons/doc.svg';

export const ResourcesScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'resources'>
> = ({navigation}) => {
  const appStyle = getAppStyle();

  const textStyles = {
    resource: {
      ...appStyle.quicksand.bold,
      ...appStyle.mainTextColor,
      ...appStyle.textM,
    },
  };

  const items: {
    titleTx: TxKeyPath;
    txKey: string;
    url: string;
    imgSrc: ImageSourcePropType;
  }[] = [
    {
      titleTx: 'resourcesScreen.resources.1',
      txKey: 'resource1',
      url: 'https://inclusio.gva.es/es/web/igualdad-diversidad/orienta',
      imgSrc: require('../../../assets/img/recursos/orienta.jpg'),
    },
    {
      titleTx: 'resourcesScreen.resources.2',
      txKey: 'resource2',
      url: 'https://www.casda.es/',
      imgSrc: require('../../../assets/img/recursos/casda.jpg'),
    },
    {
      titleTx: 'resourcesScreen.resources.3',
      txKey: 'resource3',
      url: 'https://castellolgtbi.es/',
      imgSrc: require('../../../assets/img/recursos/castellolgtbi.png'),
    },
    {
      titleTx: "resourcesScreen.resources.4",
      txKey: 'resource4',
      url: 'https://www.facebook.com/queerfestoficial/?locale=es_ES',
      imgSrc: require('../../../assets/img/recursos/queerfest.gif'),
    },
    {
      titleTx: "resourcesScreen.resources.5",
      txKey: 'resource5',
      url: 'https://www.castello.es/va/lgtbi/',
      imgSrc: require('../../../assets/img/recursos/plataformalgtbi.jpg'),
    }
  ];

  return (
    <Screen
      preset="scroll"
      backgroundColor={appStyle.screen.backgroundColor}
      style={appStyle.screen}>
      <View>
        {items.map(item => (
          <AppCard
            key={item.titleTx}
            // onPress={onPressHandler.bind(undefined, item.url)}
            onPress={() =>
              navigation.navigate('resourcesDetail', {
                txKey: item.txKey,
                url: item.url,
                imgSrc: item.imgSrc,
              })
            }
            style={{
              marginBottom: spacing.large,
              paddingVertical: spacing.large,
              alignItems: 'flex-start',
            }}>
            <View style={{marginRight: spacing.xxlarge}}>
              <DocIcon width={27} height={34.5} />
            </View>
            <View style={{flex: 1}}>
              <Text style={textStyles.resource} tx={item.titleTx} />
            </View>
          </AppCard>
        ))}
      </View>
    </Screen>
  );
};
