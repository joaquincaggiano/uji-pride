import React, { FC, useEffect } from "react"
import { Image, View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { getAppStyle, spacing } from "../../../theme"
import { NavigatorParamList } from "../../../navigators"
import { AppButton, AppCard, Screen, Text } from "../../../components"

export const GameOverScreen: FC<NativeStackScreenProps<NavigatorParamList, "gameOver">> = ({ navigation, route }) => {

  const appStyle = getAppStyle()

  const textStyles = {
    header: {
      ...appStyle.quicksand.bold,
      ...appStyle.mainTextColor,
      ...appStyle.textXXXL
    },
    results: {
      ...appStyle.quicksand.bold,
      ...appStyle.secondaryTextColor,
      ...appStyle.textXXXL
    },
    text: {
      ...appStyle.quicksand.semibold,
      ...appStyle.mainTextColor,
      ...appStyle.textM
    },
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <></>
    })
  }, [])

  const onPressExit = () => {
    navigation.navigate("home")
  }

  const getResult = () => {
    const words = route.params?.words || []
    let correctCounter = 0
    for(let i = 0; i < words.length; i++) {
      if(words[i].correct) {
        correctCounter++
      }
    }
    return correctCounter + "/" + words.length
  }

  return (
    <Screen
      preset="fixed"
      backgroundColor={appStyle.screen.backgroundColor}
      style={appStyle.screen}>

      <View style={{alignItems: "center", justifyContent: "center", marginTop: spacing.medium}}>
        <Text style={textStyles.header} tx="gameOverScreen.thanks" />
      </View>

      <AppCard
        disabled={true}
        style={{marginTop: spacing.xhuge, paddingVertical: 0, paddingLeft: 0, paddingRight: 0, overflow: "hidden", width: "100%", aspectRatio: 2}}>
        <View style={{position: "absolute", width: "100%", height: "100%"}}>
          <Image source={require('../../../../assets/img/Inicio/servicios.jpg')} style={{width: "100%", height: "100%", /*resizeMode: "cover"*/}}/>
        </View>
        <View style={{backgroundColor: "rgba(0,0,0,0.35)", width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
          <Text style={textStyles.results} tx={"gameOverScreen.results"} />
          <Text style={textStyles.results} text={getResult()} />
        </View>
      </AppCard>

      <View style={{flex: 1}}/>

      <View style={{alignItems: "center", marginVertical: spacing.small}}>
        <AppButton titleTx="gameOverScreen.exit" onPress={onPressExit} style={{paddingHorizontal: spacing.huge}}/>
      </View>
      
    </Screen>
  )
}
