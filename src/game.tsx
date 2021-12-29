import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

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

  const initialTime = 60;

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

  const [remainingTime, setRemainingTime] = useState(initialTime);

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
    <View style={styles.container}>
      <Text style={styles.counter}>{remainingTime}</Text>
      <Text style={styles.word}>{currentWord}</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={{...styles.button, backgroundColor: '#00FF0030'}}
          onPress={() => nextWord('Correct')}
        />
        <Pressable
          style={{...styles.button, backgroundColor: '#0000FF30'}}
          onPress={() => nextWord('Pass')}
        />
        <Pressable
          style={{...styles.button, backgroundColor: '#FF000030'}}
          onPress={() => nextWord('Wrong')}
        />
      </View>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  counter: {
    position: 'absolute',
    top: 15,

    width: '100%',

    textAlign: 'center',

    color: 'black',

    fontWeight: 'bold',
    fontSize: 30,
  },
  word: {
    position: 'absolute',

    textAlign: 'center',
    textAlignVertical: 'center',

    height: '100%',
    width: '100%',

    padding: 30,

    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',

    zIndex: 10,

    display: 'flex',
    flexDirection: 'row',

    height: '100%',
    width: '100%',
  },
  button: {
    flex: 1,

    height: '100%',
  },
});
