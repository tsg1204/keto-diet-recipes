import React, { useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, Dimensions, ImageBackground } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from 'react-native-responsive-screen';
//https://github.com/facebookincubator/redux-react-hook
//https://reactjs.org/docs/hooks-reference.html
//https://react-redux.js.org/api/hooks
import { Colors } from '../data/data';
import HeaderButton from '../components/HeaderButton';
import { toggleFavorite } from '../store/actions/recipes';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const RecipeDetailPage = ({navigation}) => {
  //get recipes from the state using useSelector hook
  //const availabelRecipes = useSelector(state => state.recipes.recipes);
  const catId = navigation.getParam('catId');
  const itemId = navigation.getParam('itemId');
  //console.log('itemId from RecipeDetailPage: ', itemId)
  //get/check favorites in the state 
  const currentRecipeIsFavorite = useSelector(state =>
    state.recipes.favoriteRecipes.some(recipe => recipe.id === itemId)
  );
  //const selectedItem = availabelRecipes.find(recipe => recipe.id === itemId);
  //recipe to render
  const selectedItem = useSelector( state => state.recipes.recipe)
  console.log('selected recipe from Details: ', selectedItem)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipeDetails(catId, itemId));
  }, [dispatch, itemId]);

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(itemId));
  }, [dispatch, itemId]);

  useEffect(() => {
    navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    navigation.setParams({ isFavorite: currentRecipeIsFavorite });
  }, [currentRecipeIsFavorite]);


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

RecipeDetailPage['navigationOptions'] = (navigationData) => {
  //recipeTitle came from CategoryRecipePage
  const recipeTitle = navigationData.navigation.getParam('recipeTitle')
  const toggleFav = navigationData.navigation.getParam('toggleFav');
  //console.log('toggleFav: ', toggleFav)

  const isFavorite = navigationData.navigation.getParam('isFavorite');
  //console.log('isFavorite: ', isFavorite)

  return {
    headerTitle: ` ${recipeTitle}`,
    headerStyle: {
      backgroundColor: Platform.OS === 'ios' ? '' : Colors.primaryColor,
    },
    headerTintColor: Colors.secondaryColor,
    headerRight: () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-heart" : "ios-heart-empty"}
          onPress={toggleFav}
        />
      </HeaderButtons>
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

export default RecipeDetailPage;