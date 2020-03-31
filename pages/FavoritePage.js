import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavoritesPage = props => {
  return (
    <View style={styles.container}>
      <Text>The Favorites Page!</Text>
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

export default FavoritesPage;