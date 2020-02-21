import {
  LOADING_DATA,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
    SET_RECIPE,
    SET_RECIPES,
    DELETE_RECIPE,
    POST_RECIPE,
    LIKE_RECIPE,
    UNLIKE_RECIPE,
    SUBMIT_RECIPE_COMMENT,
      SET_SCREAM,
      SET_SCREAMS,
      DELETE_SCREAM,
      POST_SCREAM,
      LIKE_SCREAM,
      UNLIKE_SCREAM,
      SUBMIT_SCREAM_COMMENT
} from '../types';
import axios from 'axios';


/****** 
 * RECIPE Actions
 ***/ 
// Get all recipes
export const getRecipes = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/recipes')
    .then((res) => {
      dispatch({
        type: SET_RECIPES,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_RECIPES,
        payload: []
      });
    });
};

export const getRecipe = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/recipe/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_RECIPE,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// Post a recipe
export const postRecipe = (newRecipe) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/recipe', newRecipe)
    .then((res) => {
      dispatch({
        type: POST_RECIPE,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Like a recipe
export const likeRecipe = (screamId) => (dispatch) => {
  axios
    .get(`/recipe/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_RECIPE,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

// Unlike a recipe
export const unlikeRecipe = (screamId) => (dispatch) => {
  axios
    .get(`/recipe/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_RECIPE,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

// Submit a recipe comment
export const submitRecipeComment = (screamId, commentData) => (dispatch) => {
  axios
    .post(`/recipe/${screamId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_RECIPE_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteRecipe = (screamId) => (dispatch) => {
  axios
    .delete(`/recipe/${screamId}`)
    .then(() => {
      dispatch({ type: DELETE_RECIPE, payload: screamId });
    })
    .catch((err) => console.log(err));
};

/****** 
 * SCREAM Actions
 ***/ 
// Get all screams
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/screams')
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: []
      });
    });
};

export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// Post a scream
export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/scream', newScream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Like a scream
export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

// Unlike a scream
export const unlikeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

// Submit a comment
export const submitScreamComment = (screamId, commentData) => (dispatch) => {
  axios
    .post(`/scream/${screamId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_SCREAM_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({ type: DELETE_SCREAM, payload: screamId });
    })
    .catch((err) => console.log(err));
};


/****** 
 * OTHER data Actions
 ***/ 
export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: null
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
