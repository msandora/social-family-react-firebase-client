import {
  LOADING_DATA,
    SET_RECIPE,
    SET_RECIPES,
    POST_RECIPE,
    DELETE_RECIPE,
    LIKE_RECIPE,
    UNLIKE_RECIPE,
    SUBMIT_RECIPE_COMMENT,
      SET_SCREAM,
      SET_SCREAMS,
      POST_SCREAM,
      DELETE_SCREAM,
      LIKE_SCREAM,
      UNLIKE_SCREAM,
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
          (recipe) => recipe.postId === action.payload.postId
        );
        state.recipes[recipeIndex] = action.payload;
        if (state.recipe.postId === action.payload.postId) {
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
        (recipe) => recipe.postId === action.payload
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
    case SUBMIT_RECIPE_COMMENT:
      let commentedOnRecipeIndex = state.recipes.findIndex(
        recipe => recipe.postId === action.payload.postId
      );
      return {
        ...state,
        recipe: {
          ...state.recipe,
          comments: [action.payload, ...state.recipe.comments],
          commentCount: state.recipe.commentCount + 1
        },
        recipes: state.recipes.map((recipe, recipesArrIndex) =>
          recipesArrIndex === commentedOnRecipeIndex
            ? { ...recipe, commentCount: recipe.commentCount + 1 }
            : recipe
        )
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
        (scream) => scream.postId === action.payload.postId
      );
      state.screams[screamIndex] = action.payload;
      if (state.scream.postId === action.payload.postId) {
        state.scream = { ...state.scream, ...action.payload };
      }
      return {
        ...state
      };
    case DELETE_SCREAM:
      screamIndex = state.screams.findIndex(
        (scream) => scream.postId === action.payload
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
      let commentedOnScreamIndex = state.screams.findIndex(
        scream => scream.postId === action.payload.postId
      );
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
          commentCount: state.scream.commentCount + 1
        },
        screams: state.screams.map((scream, screamsArrIndex) =>
          screamsArrIndex === commentedOnScreamIndex
            ? { ...scream, commentCount: scream.commentCount + 1 }
            : scream
        )
      };
    default:
      return state;
  }
}
