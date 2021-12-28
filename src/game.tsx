import React, {useEffect, useState} from 'react';

import {RouteProp, useRoute} from '@react-navigation/core';
import {Text, View} from 'react-native';

import {StackParamList} from './App';
import Card from './card';

type GameParamList = RouteProp<StackParamList, 'Game'>;

const Game = () => {
  const route = useRoute<GameParamList>();
  const categoryValuesOrganized = [...new Set(route.params.categoryValues)];

  const [currentWord, setCurrentWord] = useState('');

  const [correctScore, setCorrectScore] = useState(0);
  const [wrongScore, setWrongScore] = useState(0);
  const [passScore, setPassScore] = useState(0);

  useEffect(() => {
    setCurrentWord(
      categoryValuesOrganized[
        Math.floor(Math.random() * categoryValuesOrganized.length)
      ],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextCard = (correctResponse: boolean, pass?: boolean) => {
    if (pass) {
      setPassScore(passScore + 1);
    } else if (correctResponse) {
      setCorrectScore(correctScore + 1);
    } else {
      setWrongScore(wrongScore + 1);
    }
    setCurrentWord(
      categoryValuesOrganized[
        Math.floor(Math.random() * categoryValuesOrganized.length)
      ],
    );
  };

  return (
    <View>
      <Text>
        <Card word={currentWord} nextCard={nextCard} />
        {correctScore}
        {passScore}
        {wrongScore}
      </Text>
    </View>
  );
};

export default Game;

//const styles = StyleSheet.create({});
