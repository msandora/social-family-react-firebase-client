import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Recipe from '../components/recipe/Recipe';
import Profile from '../components/profile/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import PostRecipe from	'../components/recipe/PostRecipe';

import { connect } from 'react-redux';
import { getRecipes } from '../redux/actions/dataActions';

class Recipes extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }
  render() {
    const { recipes, loading } = this.props.data;
    let recentRecipesMarkup = !loading ? (
      recipes.map((recipe) => <Recipe key={recipe.recipeId} recipe={recipe} />)
    ) : (
      <ScreamSkeleton />
    );
    const { authenticated } = this.props;

    return (
      <Grid container spacing={16}>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
        <Grid item sm={8} xs={12}>
          {authenticated ? (
            <PostRecipe/>
            ) : ( null )
          }
          {recentRecipesMarkup}
        </Grid>
      </Grid>
    );
  }
}

Recipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data,
  authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps,
  { getRecipes }
)(Recipes);
