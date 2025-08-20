import React, {FC, useMemo, useRef, useState} from 'react';
import {FlatList, Linking, Platform, Pressable, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAppStyle, spacing} from '../../theme';
import {NavigatorParamList} from '../../navigators';
import {Screen, Text, TextField} from '../../components';
import {i18n} from '../../i18n';
import SearchIcon from '../../../assets/icons/search-sharp.svg';
import es from '../../i18n/locales/es.json';
import en from '../../i18n/locales/en.json';
import ca from '../../i18n/locales/ca.json';
//import { load, save } from "../../utils/storage"

type GlossaryWord = {
  title: string;
  desc: string;
};

type FlatListRenderItemProps = {
  item: GlossaryWord;
  index: number;
};

const getLocaleWords = () => {
  if (i18n.locale === 'es') {
    return es.glossaryWords;
  }
  if (i18n.locale === 'ca') {
    return ca.glossaryWords;
  }
  return en.glossaryWords;
};

const URL =
'https://www.uji.es/serveis/ui/puntvioletarainbow/base/rainbow/materials/glosari/';

export const GlossaryScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'glossary'>
> = ({navigation}) => {

  const flatlistRef = React.useRef<FlatList>(null);

  const getWordsArraySorted = () => {
    /*const storageWords = load(`glossaryWords-${i18n.locale}`)
    if(storageWords) {
      return storageWords
    }*/
    const wordsSorted = getLocaleWords().sort((a, b) =>
      a.title.localeCompare(b.title),
    );
    //save(`glossaryWords-${i18n.locale}`, wordsSorted)
    return wordsSorted;
  };

  const words = useRef<GlossaryWord[]>(getWordsArraySorted());
  const [filter, setFilter] = useState('');
  const [selectedWord, setSelectedWord] = useState<GlossaryWord>();

  const filteredWords = useMemo(() => {
    if (filter?.length > 0) {
      const regex = new RegExp(
        filter.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
        'gi',
      );
      return words.current.filter(word =>
        word.title
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .match(regex),
      );
    }
    return words.current;
  }, [filter]);

  const appStyle = getAppStyle();

  const textStyles = {
    input: {
      ...appStyle.quicksand.semibold,
      ...appStyle.mainTextColor,
      ...appStyle.textS,
    },
    word: {
      ...appStyle.quicksand.semibold,
      ...appStyle.mainTextColor,
      ...appStyle.textS,
    },
    wordDescription: {
      ...appStyle.poppins.regular,
      ...appStyle.mainTextColor,
      ...appStyle.textXS,
    },
    sourceText: {
      ...appStyle.poppins.regular,
      ...appStyle.mainTextColor,
      ...appStyle.textXS,
    },
  };

  const renderItem = ({item, index}: FlatListRenderItemProps) => {
    const selected = selectedWord?.title === item.title;
    return (
      <Pressable
        style={{
          paddingHorizontal: spacing.medium,
          paddingVertical: spacing.medium,
          backgroundColor:
            index % 2 === 0
              ? appStyle.mainColor
              : appStyle.screen.backgroundColor,
        }}
        onPress={() => setSelectedWord(selected ? undefined : item)}>
        <Text text={item.title} style={textStyles.word} />

        {selected && (
          <View style={{marginTop: spacing.xsmall}}>
            <Text text={item.desc} style={textStyles.wordDescription} />
          </View>
        )}
      </Pressable>
    );
  };

  const onPressSource = () => {
    Linking.openURL(URL);
  };

  return (
    <Screen
      preset="fixed"
      backgroundColor={appStyle.screen.backgroundColor}
      style={[
        appStyle.screen,
        {paddingHorizontal: 0, paddingTop: spacing.xsmall},
      ]}>
      <View style={{flexDirection: 'row', paddingHorizontal: spacing.medium}}>
        <TextField
          placeholderTx="glossaryScreen.search"
          style={{
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
            paddingRight: 0,
            width: 'auto',
            flex: 1,
            paddingVertical:
              Platform.OS === 'ios' ? spacing.xsmall : spacing.xxsmall,
          }}
          onChangeText={setFilter}
        />
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: appStyle.secondaryColor,
            borderBottomRightRadius: spacing.xsmall,
            borderTopRightRadius: spacing.xsmall,
            paddingHorizontal: spacing.xxsmall,
          }}>
          <SearchIcon width={23} height={23} />
        </View>
      </View>

      <View style={{marginTop: spacing.xxlarge}}>
        <FlatList
          ref={flatlistRef}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          data={filteredWords}
          keyExtractor={item => item.title}
          renderItem={renderItem}
          ListFooterComponent={() => (
            <View>
              <Text style={textStyles.sourceText} tx="glossaryScreen.sources" />

              <Pressable
                onPress={onPressSource}
                style={({ pressed }) => [{marginTop: spacing.xsmall}, pressed && {opacity: 0.6}]}>
                <Text style={textStyles.sourceText}>{URL}</Text>
              </Pressable>
            </View>
          )}
          ListFooterComponentStyle={{
            marginTop: spacing.huge,
            marginBottom: spacing.xxhuge,
            paddingHorizontal: spacing.medium,
          }}
        />
      </View>
    </Screen>
  );
};
