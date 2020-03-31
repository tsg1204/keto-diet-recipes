
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CategoriesPage from '../pages/CategoriesPage';
import CategoryMealsPage from '../pages/CategoryMealsPage';
import MealDetailPage from '../pages/MealDetailPage';
import FavoritePage from '../pages/FavoritePage';

const AppNavigator = createStackNavigator({
  Categories: CategoriesPage,
  CategoryMeals: {
    screen: CategoryMealsPage
  },
  MealDetails: MealDetailPage,
  FavoriteMeal: FavoritePage
});

export default createAppContainer(AppNavigator);