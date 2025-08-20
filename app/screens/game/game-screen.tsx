import React, {FC} from 'react';
import {TextStyle, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAppStyle, spacing} from '../../theme';
import {NavigatorParamList} from '../../navigators';
import {AppButton, Screen, Text} from '../../components';
import GameIcon from '../../../assets/icons/game-controller.svg';

export const GameScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'game'>
> = ({navigation}) => {
  const appStyle = getAppStyle();

  const textStyles = {
    header: {
      ...appStyle.quicksand.bold,
      ...appStyle.mainTextColor,
      ...appStyle.textXL,
      textAlign: 'center',
    } as TextStyle,
    description: {
      ...appStyle.quicksand.medium,
      ...appStyle.mainTextColor,
      ...appStyle.textM,
      textAlign: 'center',
      lineHeight: 20,
    } as TextStyle,
  };

  const onPressPlay = () => {
    navigation.navigate('gamePlay');
  };

  return (
    <Screen
      preset="scroll"
      backgroundColor={appStyle.screen.backgroundColor}
      style={appStyle.screen}>
      <View style={{marginTop: spacing.xxsmall}}>
        <Text tx="gameScreen.header" style={textStyles.header} />
      </View>

      <View style={{marginTop: spacing.huge}}>
        <Text tx="gameScreen.description" style={textStyles.description} />
      </View>

      <View style={{marginTop: spacing.huge}}>
        <Text tx="gameScreen.play" style={textStyles.header} />
      </View>

      <View style={{flex: 1, marginTop: spacing.huge, alignItems: 'center'}}>
        <GameIcon width={104} height={104} />
      </View>

      <View style={{alignItems: 'center', marginVertical: spacing.small}}>
        <AppButton
          titleTx="gameScreen.play1"
          onPress={onPressPlay}
          style={{paddingHorizontal: spacing.huge}}
        />
      </View>
    </Screen>
  );
};
