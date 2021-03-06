import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoriesPage, {screenOptions as categoriesPageOptions}  from '../pages/CategoriesPage';
import CategoryRecipePage, {screenOptions as categoryRecipePageOptions}  from '../pages/CategoryRecipePage';
import RecipeDetailPage, {screenOptions as recipeDetailsPageOptions}  from '../pages/RecipeDetailPage';
import FavoritesPage, {screenOptions as favoritesPageOptions}  from '../pages/FavoritesPage';
import CaloriesCalculator, {screenOptions as calculatorPageOptions}  from '../pages/CaloriesCalculator';
import CalculationResultPage, {screenOptions as calculationResultPageOptions}  from '../pages/CalculationResultPage';
import { Colors } from '../data/data';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'ios' ? Colors.primaryColor : 'white'
};

const AppStackNavigator = createStackNavigator();

export const AppNavigator = () => {
  return (
    <AppStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AppStackNavigator.Screen
        name="Categories"
        component={CategoriesPage}
        options={categoriesPageOptions}
      />
      <AppStackNavigator.Screen
        name="CategoryRecipes"
        component={CategoryRecipePage}
        options={categoryRecipePageOptions}
      />
      <AppStackNavigator.Screen
        name="RecipeDetails"
        component={RecipeDetailPage}
        options={recipeDetailsPageOptions}
        path={'recipe-details'}
      />
    </AppStackNavigator.Navigator>
  );
};

const FavStackNavigator = createStackNavigator();

export const FavNavigator = () => {
  return (
    <FavStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <FavStackNavigator.Screen
        name="Favorites"
        component={FavoritesPage}
        options={favoritesPageOptions}
      />
    </FavStackNavigator.Navigator>
  );
};

const CalculatorStackNavigator = createStackNavigator();

export const CalcNavigator = () => {
  return (
    <CalculatorStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <CalculatorStackNavigator.Screen
        name="Calculator"
        component={CaloriesCalculator}
        options={calculatorPageOptions}
      />
      <CalculatorStackNavigator.Screen
        name="CalculationResult"
        component={CalculationResultPage}
        options={calculationResultPageOptions}
        initialParams={{ dailyCalories: '' }}
      />
    </CalculatorStackNavigator.Navigator>
  );
};

// const CalculatResultStackNavigator = createStackNavigator();

// export const CalcResultNavigator = () => {
//   return (
//     <CalculatResultStackNavigator.Navigator screenOptions={defaultNavOptions}>
//       <CalculatResultStackNavigator.Screen
//         name="CalculationResult"
//         component={CalculationResultPage}
//         options={calculationResultPageOptions}
//         initialParams={{ dailyCalories: '2222222' }}
//       />
//     </CalculatResultStackNavigator.Navigator>
//   );
// };

const Tab = createBottomTabNavigator();

export const AppTabs = () => {
  return (
    <Tab.Navigator
        initialRouteName="Categories"
        tabBarOptions={{
          activeTintColor: Colors.primaryColor,
        }}
    >
      <Tab.Screen 
        name="Categories" 
        component={AppNavigator}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: () => (
            <Ionicons name="ios-home" size={25} color={Colors.secondaryColor} />
          ),
        }}
      />
      <Tab.Screen 
        name="Calculator" 
        component={CalcNavigator}
        options={{
          tabBarLabel: 'Calculator',
          tabBarIcon: () => (
            <Ionicons name="ios-calculator" size={25} color={Colors.secondaryColor} />
          ),
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavNavigator} 
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: () => (
            <Ionicons name="ios-heart" size={25} color={Colors.secondaryColor} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
