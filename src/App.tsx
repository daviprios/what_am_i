import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './home';
import Game from './game';
import EndScreen from './endscreen';

interface StackParamList {
  [key: string]: undefined | object;

  Home: undefined;
  Game: {categoryValues: Array<string>};
  EndScreen: {
    correctResponses: number;
    passedResponses: number;
    wrongResponses: number;
  };
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="EndScreen" component={EndScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
export type {StackParamList};
