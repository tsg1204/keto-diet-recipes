
import { MEALS } from '../../data/data';
import { TOGGLE_FAVORITE, FETCH_CATEGORIES, FETCH_RECIPES } from '../actions/recipes';

const DEFAULT_STATE = {
    categories: [],
    recipes: [],
    favoriteRecipes:[],
    testRecipes: MEALS
}
//https://banana-cupcake-51087.herokuapp.com/

export default function(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
          return { ...state, categories: action.payload };
        case FETCH_RECIPES:
            return { ...state, recipes: action.payload };
        case TOGGLE_FAVORITE:
          const existingIndex = state.favoriteRecipes.findIndex(
            recipe => recipe.id === action.recipeId
          );
          if (existingIndex >= 0) {
            const updatedFavRecipes = [...state.favoriteRecipes];
            updatedFavRecipes.splice(existingIndex, 1);
            return { ...state, favoriteRecipes: updatedFavRecipes };
          } else {
            const recipe = state.testRecipes.find(recipe => recipe.id === action.recipeId);
            return { ...state, favoriteRecipes: state.favoriteRecipes.concat(recipe) };
          }
        default:
          return state;
      }
    };
