import axios from "axios";

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
//export const FETCH_RECIPES = 'FETCH_RECIPES';

const ROOT_URL = "https://banana-cupcake-51087.herokuapp.com/";

export const toggleFavorite = (id) => {
    return { type: TOGGLE_FAVORITE, recipeId: id}
}

export function fetchCategories() {
    return async dispatch => {
        const request = await axios.get(`${ROOT_URL}categories`)
            .then((response) => {
                console.log('from action fetchCategories: ', response.data)
                return response.data
            })
            .catch( (error) => {
                console.log(error)
            });
    
        console.log(request)
        
        dispatch({ type: FETCH_CATEGORIES, payload: request });
    }
}
  