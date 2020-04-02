
import { MEALS } from '../../data/data';
import { TOGGLE_FAVORITE } from '../actions/recipes';

const DEFAULT_STATE = {
    recipes: MEALS,
    favoriteRecipes:[]
}

export default function(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case TOGGLE_FAVORITE:
          const existingIndex = state.favoriteRecipes.findIndex(
            recipe => recipe.id === action.recipeId
          );
          if (existingIndex >= 0) {
            const updatedFavRecipes = [...state.favoriteRecipes];
            updatedFavRecipes.splice(existingIndex, 1);
            return { ...state, favoriteRecipes: updatedFavRecipes };
          } else {
            const recipe = state.recipes.find(recipe => recipe.id === action.recipeId);
            return { ...state, favoriteRecipes: state.favoriteRecipes.concat(recipe) };
          }
        default:
          return state;
      }
    };
