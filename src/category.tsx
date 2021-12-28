import React from 'react';

import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, View} from 'react-native';

import {StackParamList} from './App';
import CategoryManager from './categoryManager';

type CategoryButtonProp = StackNavigationProp<StackParamList, 'Home'>;

const Category = (props: {name: string}) => {
  const {name} = props;

  const navigation = useNavigation<CategoryButtonProp>();

  const categoryManager = CategoryManager();
  const categoryValues = categoryManager.getCategory(name);

  return (
    <View>
      <Button
        title={name}
        onPress={() =>
          navigation.navigate({
            name: 'Game',
            params: {categoryValues},
            merge: true,
          })
        }
      />
    </View>
  );
};

export default Category;

//const styles = StyleSheet.create({});
