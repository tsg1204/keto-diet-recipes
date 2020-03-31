import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';

const CategoryMealPage = props => {
  //get category id from categories page via props.navigation
  const catId = props.navigation.getParam('categoryId');

  //retrive the selected category from categories list
  const selectedCat = CATEGORIES.find( cat => cat.id === catId);


  return (
    <View style={styles.container}>
      <Text>The Category Meal Page!</Text>
      <Text>{selectedCat.title}</Text>
      <Button title="Go to Meal Details!" onPress={() => {
        props.navigation.navigate('MealDetails');
    }} />
      <Button title="Go Back" onPress={() => {
        props.navigation.pop(); //on page back
    }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CategoryMealPage;