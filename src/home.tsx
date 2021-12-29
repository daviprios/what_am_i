import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import Orientation from 'react-native-orientation';

import CategoryManager from './categoryManager';
import Category from './category';

const Home = () => {
  const categoryManager = CategoryManager();
  const categories = categoryManager.getAllCategories();
  const categoriesName = [];

  for (const [key] of Object.entries(categories)) {
    categoriesName.push(key);
  }

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>QUEM SOU EU?</Text>
      <ScrollView
        style={styles.scrolled}
        contentContainerStyle={styles.scrolledContainer}>
        {categoriesName.map((name, index) => {
          const factor = index % 8;
          return (
            <Category
              key={name}
              name={name}
              backgroundColor={`hsl(${factor * 45}, 80%, 80%)`}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

    height: '100%',
    width: '100%',
  },
  header: {
    textAlign: 'center',
    textAlignVertical: 'center',

    height: 50,
    width: '100%',

    color: 'white',
    backgroundColor: 'hsl(235, 80%, 60%)',

    fontWeight: 'bold',
    fontSize: 25,
    fontFamily: 'serif',
  },
  scrolled: {
    height: '100%',
    width: '100%',

    backgroundColor: 'white',
  },
  scrolledContainer: {
    display: 'flex',

    flexDirection: 'row',
    flexWrap: 'wrap',

    height: '100%',
    width: '100%',
  },
});

export default Home;
