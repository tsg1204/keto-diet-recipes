import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const FavoritesPage = props => {
  const availabelRecipes = useSelector( state => state.recipes.favoriteRecipes);

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