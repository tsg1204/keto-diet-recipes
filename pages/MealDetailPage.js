import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, Image, Dimensions, ImageBackground } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from 'react-native-responsive-screen';

import { Colors, MEALS } from '../data/data';
import HeaderButton from '../components/HeaderButton';


const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const MealDetailPage = ({ navigation }) => {
  const [ favRecipes, setFavRecipes ] = useState([]);
  console.log('favRecipe from MealDetailPage: ', favRecipes)

  const itemId = navigation.getParam('itemId');
  const selectedItem = MEALS.find(meal => meal.id === itemId);

  //check if the recipe in the favorite list
  let currentFavorite = favRecipes.some(recipe => recipe.id === itemId);

  function updateFavorite() {
    console.log('favRecipe from updateFavorite: ', favRecipes)
    const existingIndex = favRecipes.findIndex(recipe => {
      console.log('recipe from findIndex function: ', recipe)
      recipe.id === itemId});
    console.log('existing index: ', existingIndex)
    //console.log('favRecipe after update: ', favRecipes)
    if (existingIndex >= 0 ) {
        let updatedFav = [...favRecipes];
        updatedFav.splice(existingIndex, 1);
        console.log('existing index from after splice of the array: ', existingIndex)
        currentFavorite = false;
        navigation.setParams({ isFavorite: currentFavorite})
        console.log('currentFavorite from update function: ', currentFavorite)
      return setFavRecipes([ ...favRecipes, updatedFav])
    } else {
        currentFavorite = true;
        navigation.setParams({ isFavorite: currentFavorite})
      return setFavRecipes([...favRecipes, favRecipes.concat(selectedItem)]);
    }
  }

  useEffect(() => {
    navigation.setParams({ toggleFav: updateFavorite})
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageBackground source={{ uri: selectedItem.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text>Duration: {selectedItem.duration} min</Text>
        </View>
        <Text style={styles.title}>Ingredients</Text>
        {selectedItem.ingredients.map(ingredient => (
          <ListItem key={ingredient}>{ingredient}</ListItem>
        ))}
        <Text style={styles.title}>Steps</Text>
        {selectedItem.steps.map(step => (
          <ListItem key={step}>{step}</ListItem>
        ))}
      </View>
    </ScrollView>
  );
};

MealDetailPage['navigationOptions'] = (navigationData) => {
  const itemId = navigationData.navigation.getParam('itemId');
  const selectedItem = MEALS.find(meal => meal.id === itemId);

  const toggleFav = navigationData.navigation.getParam('toggleFav');
  console.log('toggleFav: ', toggleFav)

  const isFavorite = navigationData.navigation.getParam('isFavorite');
  console.log('isFavorite: ', isFavorite)

  return {
    headerTitle: ` ${selectedItem.title}`,
    headerStyle: {
      backgroundColor: Platform.OS === 'ios' ? '' : Colors.primaryColor,
    },
    headerTintColor: Colors.secondaryColor,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-heart" : "ios-heart-empty"}
          onPress={toggleFav}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  imageContainer: {
    marginVertical: 10,
    marginHorizontal: Platform.OS === 'ios' ? 5 : 50,
  },
  image: {
    width: Platform.OS === 'ios' ? Dimensions.get('screen').width : Dimensions.get('window').width,
    height: Platform.OS === 'ios' ? Dimensions.get('screen').width*.5 : Dimensions.get('window').width*.2,
    justifyContent: 'flex-end',
  },
  details: {
    flexDirection: 'row',
    padding: 5,
    marginLeft: 20,
    //textAlign: 'left',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: hp('1.9%'),
    textAlign: 'center',
    color: Colors.secondaryColor
  },
  listItem: {
    marginVertical: 5,
    marginHorizontal: Platform.OS === 'ios' ? 40 : 200,
    padding: 5
  }
});

export default MealDetailPage;