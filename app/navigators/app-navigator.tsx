import React, { useReducer } from 'react';
import {ImageSourcePropType, Pressable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  ResourcesScreen,
  ResourcesDetailScreen,
  PublicationsScreen,
  ServicesScreen,
  ServicesIgualdadScreen,
  ServicesRainbowScreen,
  ServicesSanitariosScreen,
  UjiprideScreen,
  ProtocolsScreen,
  ProtocolsDetailScreen,
  GlossaryScreen,
  GameScreen,
  GameOverScreen,
  GamePlayScreen,
  GameWord,
  ServicesVioletaScreen,
  ServicesDiversidadScreen,
} from '../screens';
import {navigationRef} from './navigation-utilities';
import {translate} from '../i18n';
import {light} from '../theme';
import BackIcon from '../../assets/icons/chevron-back.svg';

export type NavigatorParamList = {
  home: undefined;
  resources: undefined;
  services: undefined;
  ujipride: undefined;
  protocols: undefined;
  publications: undefined;
  glossary: undefined;
  game: undefined;
  servicesIgualdad: undefined;
  servicesRainbow: undefined;
  servicesSanitarios: undefined;
  servicesVioleta: undefined;
  servicesDiversidad: undefined;
  protocolsDetail: {txKey: string; url: string};
  resourcesDetail: {txKey: string; url: string; imgSrc: ImageSourcePropType};
  gamePlay: undefined;
  gameOver: {words: GameWord[]};
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends NavigatorParamList {}
  }
}

const Stack = createNativeStackNavigator<NavigatorParamList>();

export let forceUpdateAppStack: () => void = () => {}

const AppStack = () => {
  const [_, forceUpdate] = useReducer(x => x + 1, 0)
  forceUpdateAppStack = forceUpdate // changeLanguage
  return (
    <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTintColor: light.mainTextColor.color, //iOS
      headerTitleStyle: {
        fontFamily: "Quicksand-Bold",
        fontSize: 18,
        color: light.mainTextColor.color
      },
      headerStyle: {
        backgroundColor: light.screen.backgroundColor,
      },
      headerTitleAlign: "center",
      headerShadowVisible: false,
      headerLeft: () => (
        <Pressable
          onPress={() => navigationRef.current?.goBack()}
          style={({pressed}) => ({ marginLeft: -6, opacity: pressed ? 0.6 : 1 })}>
          <BackIcon width={24} height={24} />
        </Pressable>
      ),
    }}
      initialRouteName="home">
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="resources"
        component={ResourcesScreen}
        options={{title: translate('resourcesScreen.title')}}
      />
      <Stack.Screen
        name="resourcesDetail"
        component={ResourcesDetailScreen}
        options={{title: translate('resourcesDetailScreen.title')}}
      />
      <Stack.Screen
        name="publications"
        component={PublicationsScreen}
        options={{title: translate('publicationsScreen.title')}}
      />
      <Stack.Screen
        name="services"
        component={ServicesScreen}
        options={{title: translate('servicesScreen.title')}}
      />
      <Stack.Screen
        name="servicesIgualdad"
        component={ServicesIgualdadScreen}
        options={{title: translate('servicesIgualdadScreen.title')}}
      />
      <Stack.Screen
        name="servicesRainbow"
        component={ServicesRainbowScreen}
        options={{title: translate('servicesRainbowScreen.title')}}
      />
      <Stack.Screen
        name="servicesSanitarios"
        component={ServicesSanitariosScreen}
        options={{title: translate('servicesSanitariosScreen.title')}}
      />
      <Stack.Screen
        name="servicesVioleta"
        component={ServicesVioletaScreen}
        options={{title: translate('servicesVioletaScreen.title')}}
      />
      <Stack.Screen
        name="servicesDiversidad"
        component={ServicesDiversidadScreen}
        options={{title: translate('servicesDiversidadScreen.title')}}
      />
      <Stack.Screen
        name="ujipride"
        component={UjiprideScreen}
        options={{title: translate('ujiprideScreen.title')}}
      />
      <Stack.Screen
        name="protocols"
        component={ProtocolsScreen}
        options={{title: translate('protocolsScreen.title')}}
      />
      <Stack.Screen
        name="protocolsDetail"
        component={ProtocolsDetailScreen}
        options={{title: translate('protocolsDetailScreen.title')}}
      />
      <Stack.Screen
        name="glossary"
        component={GlossaryScreen}
        options={{title: translate('glossaryScreen.title')}}
      />
      <Stack.Screen
        name="game"
        component={GameScreen}
        options={{title: translate('gameScreen.title')}}
      />
      <Stack.Screen
        name="gameOver"
        component={GameOverScreen}
        options={{title: translate('gameOverScreen.title')}}
      />
      <Stack.Screen
        name="gamePlay"
        component={GamePlayScreen}
        options={{title: translate('gamePlayScreen.title')}}
      />
    </Stack.Navigator>
  );
};

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};

AppNavigator.displayName = 'AppNavigator';
