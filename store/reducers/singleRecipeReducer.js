import { FETCH_RECIPE_DETAILS } from '../actions/recipes';

const DEFAULT_STATE = {
    recipe: {
        category: [],
        title: '',
        imageUrl: '',
        duration: 0,
        date_created: '',
        ingredients: [],
        steps: [],
        favorite: ''
    }
}

export default function(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case FETCH_RECIPE_DETAILS:
          return Object.assign({}, state, {
            recipe: action.payload
            })
        default:
          return state;
      }
    };