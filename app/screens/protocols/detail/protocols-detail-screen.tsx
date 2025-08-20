import React, {FC} from 'react';
import {Linking, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAppStyle, spacing} from '../../../theme';
import {NavigatorParamList} from '../../../navigators';
import {AppButton, Screen, Text} from '../../../components';
import {TxKeyPath} from '../../../i18n';

export const ProtocolsDetailScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'protocolsDetail'>
> = ({navigation, route}) => {
  const URL = route.params?.url;
  const TX_KEY = route.params?.txKey;

  const titleTx = `protocolsDetailScreen.${TX_KEY}` as TxKeyPath;
  const descTx = `protocolsDetailScreen.${TX_KEY}_desc` as TxKeyPath;

  const appStyle = getAppStyle();

  const textStyles = {
    title: {
      ...appStyle.quicksand.bold,
      ...appStyle.mainTextColor,
      ...appStyle.textM,
    },
    description: {
      ...appStyle.poppins.regular,
      ...appStyle.mainTextColor,
      ...appStyle.textS,
    },
  };

  const onPressMoreInfo = () => {
    Linking.openURL(URL);
  };

  return (
    <Screen
      preset="scroll"
      backgroundColor={appStyle.screen.backgroundColor}
      style={[appStyle.screen, {paddingBottom: 0}]}>
      <Text tx={titleTx} style={textStyles.title} />

      <View style={{flex: 1, marginTop: spacing.xlarge}}>
        <Text tx={descTx} style={textStyles.description} />
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginVertical: spacing.xxlarge,
        }}>
        <AppButton
          style={{paddingHorizontal: spacing.xlarge}}
          titleTx={'protocolsDetailScreen.more'}
          onPress={onPressMoreInfo}
        />
      </View>
    </Screen>
  );
};
