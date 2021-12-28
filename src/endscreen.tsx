import React from 'react';
import {Button, Text, View} from 'react-native';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from './App';

type EndScreenParamList = RouteProp<StackParamList, 'EndScreen'>;
type EndScreenProp = StackNavigationProp<StackParamList, 'EndScreen'>;

const Endscreen = () => {
  const route = useRoute<EndScreenParamList>();
  const navigation = useNavigation<EndScreenProp>();

  const {correctResponses, passedResponses, wrongResponses} = route.params;

  return (
    <View>
      <Text>Correct: {correctResponses}</Text>
      <Text>Passed: {passedResponses}</Text>
      <Text>Wrong: {wrongResponses}</Text>
      <Button title="Continue" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default Endscreen;

//const styles = StyleSheet.create({});
