import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { Colors, MEALS } from '../data/data';

const MealDetailPage = ({ navigation }) => {
  const itemId = navigation.getParam('itemId');

  const selectedItem = MEALS.find(meal => meal.id === itemId);

  return (
    <View style={styles.container}>
      <Text>The Meal Detail Page!</Text>
      <Text>{selectedItem.title}</Text>
      <Button title="Go Back to Categories" onPress={() => {
        navigation.popToTop(); //all the way back to first page
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

export default MealDetailPage;