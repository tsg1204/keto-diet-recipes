import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MealDetailPage = props => {
  return (
    <View style={styles.container}>
      <Text>The Meal Detail Page!</Text>
      <Button title="Go Back to Categories" onPress={() => {
        props.navigation.popToTop(); //all the way back to first page
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