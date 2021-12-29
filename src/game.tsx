import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {StackParamList} from './App';

import Orientation from 'react-native-orientation';

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

  const [remainingTime, setRemainingTime] = useState(3);

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

  const navigateToEndScreen = () => {
    navigation.navigate({
      name: 'EndScreen',
      params: {
        correctResponses: correctScore,
        passedResponses: passScore,
        wrongResponses: wrongScore,
      },
      merge: true,
    });
  };

  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (remainingTime > 0) {
        setRemainingTime(prev => prev - 1);
      } else {
        Orientation.lockToPortrait();
        navigateToEndScreen();
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTime]);

  return (
    <View>
      <Text style={styles.counter}>{remainingTime}</Text>
      <Text>{currentWord}</Text>
      <Button title="Correct" onPress={() => nextWord('Correct')} />
      <Button title="Pass" onPress={() => nextWord('Pass')} />
      <Button title="Wrong" onPress={() => nextWord('Wrong')} />
      <Text>{correctScore}</Text>
      <Text>{passScore}</Text>
      <Text>{wrongScore}</Text>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  counter: {
    position: 'absolute',
    top: 15,
    zIndex: 10,

    width: '100%',

    textAlign: 'center',

    fontWeight: 'bold',
  },
});
