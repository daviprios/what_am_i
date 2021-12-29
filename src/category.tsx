import React from 'react';

import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {Pressable, StyleSheet, Text} from 'react-native';

import {StackParamList} from './App';
import CategoryManager from './categoryManager';

type CategoryButtonProp = StackNavigationProp<StackParamList, 'Home'>;

const Category = (props: {name: string; backgroundColor: string}) => {
  const {name, backgroundColor} = props;

  const navigation = useNavigation<CategoryButtonProp>();

  const categoryManager = CategoryManager();
  const categoryValues = categoryManager.getCategory(name);

  return (
    <Pressable
      style={{...styles.button, backgroundColor}}
      onPress={() =>
        navigation.navigate({
          name: 'Game',
          params: {categoryValues},
          merge: true,
        })
      }>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
};

export default Category;

const styles = StyleSheet.create({
  button: {
    height: 150,
    width: '50%',
  },
  text: {
    height: '100%',
    width: '100%',

    textAlign: 'center',
    textAlignVertical: 'center',

    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 20,

    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
  },
});
