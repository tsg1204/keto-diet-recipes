import axios from "axios";

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const FETCH_RECIPES = 'FETCH_RECIPES';
export const FETCH_RECIPE_DETAILS = 'FETCH_RECIPE_DETAILS';


const ROOT_URL = "https://banana-cupcake-51087.herokuapp.com/";

export const toggleFavoriteButton = (id) => {
    return { type: TOGGLE_FAVORITE, recipeId: id }
}

export const fetchCategories = () => dispatch => {
    axios.get(`${ROOT_URL}categories`
    ).then(function (response) {
      //console.log('response from fetchCategories: ', response)
      dispatch({ type: FETCH_CATEGORIES, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const fetchRecipes = (catId) => dispatch => {
    axios.get(`${ROOT_URL}categories/${catId}/recipes`
    ).then(function (response) {
      //console.log("response from fetchRecipes", response.data[0].recipes)
      dispatch({ type: FETCH_RECIPES, payload: response.data[0].recipes
     });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const fetchRecipeDetails = (catId, recId) => dispatch => {
    axios.get(`${ROOT_URL}categories/${catId}/recipes/${recId}`
    ).then(function (response) {
      //console.log("response from fetchRecipeDetails", response.data)
      dispatch({ type: FETCH_RECIPE_DETAILS, payload: response.data
     });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const toggleFavorite = (catId, recId, favorite) => dispatch => {
  const body = {"favorite": favorite }
  axios.put(`${ROOT_URL}categories/${catId}/recipes/${recId}/toggleFavorite`, body)
  .then(function (response) {
    console.log("response from toggleFavorite actions", response.data)
    //dispatch({ type: FETCH_RECIPE_DETAILS, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
}
  
export const fetchFavoriteRecipes = () => dispatch => {
  axios.get(`${ROOT_URL}favorites`
  ).then(function (response) {
    //console.log("response from fetchFavoriteRecipes", response.data)
    dispatch({ type: FETCH_FAVORITES, payload: response.data
   });
  })
  .catch(function (error) {
    console.log(error);
  });
};
