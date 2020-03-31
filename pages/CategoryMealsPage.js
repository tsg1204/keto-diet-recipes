import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CategoryMealPage = props => {
  return (
    <View style={styles.container}>
      <Text>The Category Meal Page!</Text>
      <Button title="Go to Meal Details!" onPress={() => {
        props.navigation.navigate('MealDetails');
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