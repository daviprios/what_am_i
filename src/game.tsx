import React, {useEffect, useState} from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {Text, View} from 'react-native';

import {StackParamList} from './App';
import Card from './card';

type GameParamList = RouteProp<StackParamList, 'Game'>;
type GameProp = StackNavigationProp<StackParamList, 'Game'>;

const shuffleStringArray = (stringArray: Array<string>) => {
  let currentIndex = stringArray.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [stringArray[currentIndex], stringArray[randomIndex]] = [
      stringArray[randomIndex],
      stringArray[currentIndex],
    ];
  }

  return stringArray;
};

const Game = () => {
  const route = useRoute<GameParamList>();
  const navigation = useNavigation<GameProp>();

  const [correctScore, setCorrectScore] = useState(0);
  const [wrongScore, setWrongScore] = useState(0);
  const [passScore, setPassScore] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(1);

  const [categoryValuesOrganized] = useState(() =>
    shuffleStringArray([...new Set(route.params.categoryValues)]),
  );

  const [currentWord, setCurrentWord] = useState(
    () => categoryValuesOrganized[0],
  );

  const [remainingTime, setRemainingTime] = useState(90);

  const nextWord = (response: string) => {
    if (currentWordIndex === categoryValuesOrganized.length + 1) {
      setCurrentWord('NO MORE WORDS');
      return;
    }

    switch (response) {
      case 'Wrong':
        setWrongScore(wrongScore + 1);
        break;
      case 'Pass':
        setPassScore(passScore + 1);
        break;
      case 'Correct':
        setCorrectScore(correctScore + 1);
        break;
    }

    setCurrentWord(categoryValuesOrganized[currentWordIndex]);
    setCurrentWordIndex(prev => prev + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      if (remainingTime > 0) {
        setRemainingTime(prev => prev - 1);
      } else {
        navigation.navigate('Home');
      }
    }, 1000);
  }, [navigation, remainingTime]);

  return (
    <View>
      <Text>
        {remainingTime}
        <Card word={currentWord} nextWord={nextWord} />
        {correctScore}
        {passScore}
        {wrongScore}
      </Text>
    </View>
  );
};

export default Game;

//const styles = StyleSheet.create({});
