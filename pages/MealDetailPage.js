import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MealDetailPage = props => {
  return (
    <View style={styles.container}>
      <Text>The Meal Detail Page!</Text>
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