
import { MEALS } from '../../data/data';
import { TOGGLE_FAVORITE, FETCH_CATEGORIES, FETCH_RECIPES, FETCH_RECIPE_DETAILS } from '../actions/recipes';

const DEFAULT_STATE = {
    categories: [],
    recipes: [],
    favoriteRecipes:[],
    testRecipes: MEALS,
    recipe: {}
}
//https://banana-cupcake-51087.herokuapp.com/

export default function(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
          return { ...state, categories: action.payload };
        case FETCH_RECIPES:
            return { ...state, recipes: action.payload };
        case FETCH_RECIPE_DETAILS:
          // return Object.assign({}, state, {
          //   recipe: action.payload
          //   })
          return { ...state, recipe: action.payload };
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
