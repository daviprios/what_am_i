import React from 'react';
import {Button, Text, View} from 'react-native';

const Card = (props: {word: string; nextWord: Function}) => {
  const {word, nextWord} = props;

  return (
    <View>
      <Text>{word}</Text>
      <Button title="Correct" onPress={() => nextWord('Correct')} />
      <Button title="Pass" onPress={() => nextWord('Pass')} />
      <Button title="Wrong" onPress={() => nextWord('Wrong')} />
    </View>
  );
};

export default Card;

//const styles = StyleSheet.create({})
