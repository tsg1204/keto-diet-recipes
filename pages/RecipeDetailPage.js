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
import { toggleFavorite, fetchRecipeDetails, fetchFavoriteRecipes, toggleFavoriteButton } from '../store/actions/recipes';

const ListItem = items => {
  return (
    <View style={styles.listItem}>
      <Text>{items.children}</Text>
    </View>
  );
};

const RecipeDetailPage = props => {
  const catId = props.route.params.catId;
  const itemId = props.route.params.itemId;
  const insideId = props.route.params.insideId;

  const currentRecipeIsFavorite = useSelector(state =>
    state.recipes.favoriteRecipes.some(recipe => recipe.id === insideId)
  );
  //recipe to render
  const selectedItem = useSelector( state => state.recipe.recipe)

  const dispatch = useDispatch();

  useEffect(() => {
    //console.log('from fethRecipeDetails')
    dispatch(fetchRecipeDetails(catId, itemId));   
  }, [dispatch, catId, itemId]);

  useEffect(() => {
    //console.log('from fetchFavoriteRecipes')
    dispatch(fetchFavoriteRecipes());   
  }, [dispatch]);

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(
      toggleFavoriteButton(insideId)
    );   
  }, [dispatch, currentRecipeIsFavorite]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ favorite: currentRecipeIsFavorite });
    //update DB for current recipe, set favorite to currentRecipeIsFavorite value
    dispatch(toggleFavorite(catId, itemId, currentRecipeIsFavorite));
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

export const screenOptions = navData => {
  const recipeTitle = navData.route.params.recipeTitle;
  const toggleFav = navData.route.params.toggleFav;
  const isFavorite = navData.route.params.favorite;

  return {
    headerTitle: ` ${recipeTitle}`,
    headerStyle: {
      backgroundColor: Colors.primaryColor,
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
    marginHorizontal: Platform.OS === 'ios' ? 5 : (Platform.OS === 'android' ? 20 : 50),
  },
  image: {
    width: Platform.OS === 'ios' ? Dimensions.get('screen').width : Dimensions.get('window').width*.8,
    height: Platform.OS === 'ios' ? Dimensions.get('screen').width*.5 : Dimensions.get('window').width*.2,
    //justifyContent: 'flex-end',
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
    marginHorizontal: Platform.OS === 'ios' ? 40 : (Platform.OS === 'android' ? 20 : 200),
    padding: 5
  }
});

export default RecipeDetailPage;