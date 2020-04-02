
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CategoriesPage from '../pages/CategoriesPage';
import CategoryRecipePage from '../pages/CategoryRecipePage';
import RecipeDetailPage from '../pages/RecipeDetailPage';
import FavoritePage from '../pages/FavoritePage';

const AppNavigator = createStackNavigator({
  Categories: CategoriesPage,
  CategoryRecipes: {
    screen: CategoryRecipePage
  },
  RecipeDetails: RecipeDetailPage,
  FavoriteRecipes: FavoritePage
});

export default createAppContainer(AppNavigator);