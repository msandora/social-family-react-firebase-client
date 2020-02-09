import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Recipe from '../components/recipe/Recipe';
import Profile from '../components/profile/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';
// import PostScream from	'../components/scream/PostScream';

import { connect } from 'react-redux';
import { getRecipes } from '../redux/actions/dataActions';

class Recipes extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }
  render() {
    const { authenticated } = this.props;
    const { recipes, loading } = this.props.data;

    let recentScreamsMarkup = !loading ? (
      recipes.map((recipe) => <Recipe key={recipe.recipeId} recipe={recipe} />)
    ) : (
      <ScreamSkeleton />
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
        <Grid item sm={8} xs={12}>
  

          {recentScreamsMarkup}
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