import React from 'react';
import {Button, Text, View} from 'react-native';

const Card = (props: {word: string; nextCard: Function}) => {
  const {word, nextCard} = props;

  return (
    <View>
      <Text>{word}</Text>
      <Button title="Correct" onPress={() => nextCard(true)} />
      <Button title="Pass" onPress={() => nextCard(false, true)} />
      <Button title="Wrong" onPress={() => nextCard(false)} />
    </View>
  );
};

export default Card;

//const styles = StyleSheet.create({})
