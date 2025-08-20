import React, {FC, useEffect, useState} from 'react';
import {Dimensions, Platform, Pressable, View, ViewStyle} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAppStyle, palette, spacing} from '../../../theme';
import {NavigatorParamList} from '../../../navigators';
import {
  AppButton,
  AppButtonTheme,
  Screen,
  Text,
  TextField,
} from '../../../components';
import {i18n, translate} from '../../../i18n';
import es from '../../../i18n/locales/es.json';
import en from '../../../i18n/locales/en.json';
import ca from '../../../i18n/locales/ca.json';

export type GameWord = {
  letter: string;
  title: string;
  desc: string;
  correct?: boolean;
  response?: string;
  contains?: boolean;
};

const getLocaleWords = () => {
  if (i18n.locale === 'es') {
    return es.gameWords;
  }
  if (i18n.locale === 'ca') {
    return ca.gameWords;
  }
  return en.gameWords;
};

const deepClone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

const BTN_STYLES: ViewStyle = {
  width: 125,
  justifyContent: 'center',
};

const screenWidth = Math.round(Dimensions.get('window').width);
const LETTER_SIZE = 38;

export const GamePlayScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'gamePlay'>
> = ({navigation}) => {
  //K, V, X, Y
  const appStyle = getAppStyle();

  const textStyles = {
    headerOption: {
      ...appStyle.quicksand.semibold,
      ...appStyle.mainTextColor,
      ...appStyle.textS,
    },
    letter: {
      ...appStyle.quicksand.bold,
      ...appStyle.mainTextColor, // respondida o current es secondaryTextColor
      ...appStyle.textL,
    },
    question: {
      ...appStyle.quicksand.medium,
      ...appStyle.mainTextColor,
      ...appStyle.textM,
    },
    contain: {
      ...appStyle.quicksand.bold,
      ...appStyle.mainTextColor,
      ...appStyle.textL,
      marginTop: spacing.huge,
    },
  };

  const [words, setWords] = useState<GameWord[]>(deepClone(getLocaleWords()));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [answer, setAnswer] = useState<string>();

  const totalWordSize = LETTER_SIZE + spacing.xxsmall * 2;
  const wordsPerRow = Math.floor(screenWidth / totalWordSize);
  const lastRowWords = words.length % wordsPerRow;

  useEffect(() => {
    const pressableStyle = ({pressed}: {pressed: boolean}) => ({
      opacity: pressed ? 0.6 : 1,
    });
    navigation.setOptions({
      headerLeft: () =>
        words[currentWordIndex].letter === 'A' ? (
          <></>
        ) : (
          <Pressable
            style={pressableStyle}
            onPress={() => setCurrentWordIndex(currentWordIndex - 1)}>
            <Text
              tx="gamePlayScreen.previous"
              style={textStyles.headerOption}
            />
          </Pressable>
        ),
      headerRight: () => (
        <Pressable style={pressableStyle} onPress={() => navigation.goBack()}>
          <Text tx="common.cancel" style={textStyles.headerOption} />
        </Pressable>
      ),
    });
  }, [currentWordIndex]);
  
  const onPressCheck = () => {
    if (answer != null && answer.trim() !== '') {
      const normalizedAnswer = answer
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s/g, '')
        .toLocaleLowerCase();
  
      const normalizedTitle = words[currentWordIndex].title
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s/g, '')
        .toLocaleLowerCase();
  
      const isCorrect = normalizedAnswer === normalizedTitle;
  
      const newWords = [...words];
      newWords[currentWordIndex].correct = isCorrect;
      newWords[currentWordIndex].response = answer;
      setWords(newWords);
      setAnswer(undefined);
    }
  };
  

  const nextWord = () => {
    setAnswer(undefined);
    // hay que buscar si queda alguna por contestar por delante
    for (let i = currentWordIndex + 1; i < words.length; i++) {
      if (words[i].correct == null) {
        setCurrentWordIndex(i);
        return;
      }
    }

    // luego por detrás
    for (let i = 0; i <= currentWordIndex; i++) {
      if (words[i].correct == null) {
        setCurrentWordIndex(i);
        return;
      }
    }

    // si no queda ningua por contestar, movemos a la pantalla de fin
    navigation.navigate('gameOver', {words});
  };

  return (
    <Screen
      preset="fixed"
      backgroundColor={appStyle.screen.backgroundColor}
      style={[appStyle.screen, {paddingTop: 0, paddingHorizontal: 0}]}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingHorizontal: 9,
        }}>
        {words.map((word, index) => {
          const current = words[currentWordIndex].letter === word.letter;
          const pending = word.correct == null;
          return (
            <Pressable
              key={word.letter}
              disabled={pending || current}
              onPress={() => setCurrentWordIndex(index)}
              style={({pressed}) => ({
                backgroundColor: current
                  ? palette.black
                  : pending
                  ? palette.mediumGrey
                  : word.correct
                  ? palette.green
                  : palette.red,
                //flex: 1,
                width: LETTER_SIZE,
                height: LETTER_SIZE,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: LETTER_SIZE,
                marginTop: spacing.medium,
                marginHorizontal: spacing.xxsmall,
                opacity: pressed ? 0.6 : 1,
              })}>
              <Text
                text={word.letter}
                style={[
                  textStyles.letter,
                  (current || !pending) && {
                    color: appStyle.secondaryTextColor.color,
                  },
                ]}
              />
            </Pressable>
          );
        })}

        {Array(wordsPerRow - lastRowWords)
          .fill(0)
          .map((_, index) => (
            <View key={index} style={{width: totalWordSize}} />
          ))}
      </View>

      <View style={{paddingHorizontal: spacing.medium}}>
        <Text
          style={textStyles.contain}
          text={
            translate(
              words[currentWordIndex].contains
                ? 'gamePlayScreen.contain'
                : 'gamePlayScreen.beginWith',
            ) +
            ' ' +
            words[currentWordIndex].letter
          }
        />
      </View>

      <View style={{paddingHorizontal: spacing.medium}}>
        <View style={{marginTop: spacing.huge}}>
          <Text
            text={words[currentWordIndex].desc}
            style={textStyles.question}
          />
        </View>

        <View style={{marginTop: spacing.xlarge}}>
          <TextField
            placeholder={
              words[currentWordIndex].response ||
              translate('gamePlayScreen.answer')
            }
            placeholderTextColor={
              words[currentWordIndex].correct == null
                ? palette.black
                : words[currentWordIndex].correct
                ? palette.green
                : palette.red
            }
            editable={words[currentWordIndex].correct == null}
            value={answer}
            onChangeText={setAnswer}
            style={{
              ...appStyle.textM,
              paddingVertical:
                Platform.OS === 'ios' ? spacing.small : spacing.xsmall,
              paddingHorizontal: spacing.medium,
            }}
          />
        </View>

        {words[currentWordIndex].correct == null && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: spacing.xlarge,
            }}>
            <AppButton
              titleTx="gamePlayScreen.skip"
              onPress={nextWord}
              theme={AppButtonTheme.secondary}
              style={BTN_STYLES}
            />
            <AppButton
              titleTx="gamePlayScreen.check"
              onPress={onPressCheck}
              style={BTN_STYLES}
            />
          </View>
        )}

        {words[currentWordIndex].correct != null && (
          <View style={{marginTop: spacing.xlarge, alignItems: 'center'}}>
            <Text
              text={
                words[currentWordIndex].correct === false
                  ? translate('gamePlayScreen.result') +
                    ': ' +
                    words[currentWordIndex].title
                  : translate('gamePlayScreen.correct')
              }
              style={textStyles.letter}
            />
            <AppButton
              titleTx="gamePlayScreen.next"
              onPress={nextWord}
              style={{...BTN_STYLES, marginTop: spacing.xlarge}}
            />
          </View>
        )}
      </View>
    </Screen>
  );
};
