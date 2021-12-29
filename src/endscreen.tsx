import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

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
    <View style={styles.container}>
      <Text style={{...styles.text, color: 'green'}}>
        Correct: <Text style={styles.number}>{correctResponses}</Text>
      </Text>
      <Text style={{...styles.text, color: 'orange'}}>
        Passed: <Text style={styles.number}>{passedResponses}</Text>
      </Text>
      <Text style={{...styles.text, color: 'red'}}>
        Wrong: <Text style={styles.number}>{wrongResponses}</Text>
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
  );
};

export default Endscreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    height: '100%',
    width: '100%',
  },
  text: {
    marginBottom: 15,

    fontSize: 20,
    fontWeight: 'bold',
  },
  number: {
    color: 'blue',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    height: 60,
    width: '80%',

    marginTop: 30,

    backgroundColor: '#4040FF',

    borderRadius: 15,
  },
  buttonText: {
    color: 'white',

    fontSize: 25,
  },
});
