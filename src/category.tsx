import React from 'react';
import {Text, View} from 'react-native';

const Category = (props: {name: string}) => {
  const {name} = props;

  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default Category;

//const styles = StyleSheet.create({});
