import React from 'react';
import {ScrollView, Text, View} from 'react-native';

import CategoryManager from './categoryManager';
import Category from './category';

const Home = () => {
  const categoryManager = CategoryManager();
  const categories = categoryManager.getAllCategories();
  const categoriesName = [];

  for (const [key] of Object.entries(categories)) {
    categoriesName.push(key);
  }

  return (
    <View>
      <Text>Quem sou eu?</Text>
      <ScrollView>
        {categoriesName.map(name => {
          return <Category key={name} name={name} />;
        })}
      </ScrollView>
    </View>
  );
};

//const styles = StyleSheet.create({});

export default Home;
