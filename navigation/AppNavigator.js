import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CategoriesPage from '../pages/CategoriesPage';
import CategoryRecipePage from '../pages/CategoryRecipePage';
import RecipeDetailPage from '../pages/RecipeDetailPage';
import FavoritesPage from '../pages/FavoritesPage';
import { Colors } from '../data/data';
import { Ionicons } from '@expo/vector-icons';

const AppNavigator = createStackNavigator({
  Categories: CategoriesPage,
  CategoryRecipes: {
    screen: CategoryRecipePage
  },
  RecipeDetails: RecipeDetailPage,
  Favorites: FavoritesPage,
});

const tabScreenConfig = {
  Categories: {
    screen: AppNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-home" size={25} color={Colors.secondaryColor} />
        );
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Favorites: {
    screen: FavoritesPage,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-heart" size={25} color={Colors.secondaryColor} />;
      },
      tabBarColor: Colors.secondaryColor
    }
  }
};

const RecipesFavTabNavigator =
  createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.secondaryColor
        }
      });

export default createAppContainer(RecipesFavTabNavigator);