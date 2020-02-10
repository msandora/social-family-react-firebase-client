import {
  SET_RECIPE,
  SET_RECIPES,
  POST_RECIPE,
  DELETE_RECIPE,
  LIKE_RECIPE,
  UNLIKE_RECIPE,

  SET_SCREAM,
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_SCREAM_COMMENT
} from '../types';

const initialState = {
  recipes: [],
  recipe: {},
  screams: [],
  scream: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false
      };
    case LIKE_RECIPE:
      case UNLIKE_RECIPE:
        let recipeIndex = state.recipes.findIndex(
          (recipe) => recipe.recipeId === action.payload.recipeId
        );
        state.recipes[recipeIndex] = action.payload;
        if (state.recipe.recipeId === action.payload.recipeId) {
          state.recipe = { ...state.recipe, ...action.payload };
        }
        return {
          ...state
        };
    case SET_RECIPE:
      return {
        ...state,
        recipe: action.payload
      };
    case DELETE_RECIPE:
      recipeIndex = state.recipes.findIndex(
        (recipe) => recipe.recipeId === action.payload
      );
      state.recipes.splice(recipeIndex, 1);
      return {
        ...state
      };
    case POST_RECIPE:
      return {
        ...state,
        recipes: [action.payload, ...state.recipes]
      };

    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let screamIndex = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[screamIndex] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = { ...state.scream, ...action.payload };
      }
      return {
        ...state
      };
    case DELETE_SCREAM:
      screamIndex = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(screamIndex, 1);
      return {
        ...state
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    case SUBMIT_SCREAM_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments]
        }
      };
    default:
      return state;
  }
}
