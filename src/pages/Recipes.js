import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
// Components
import Recipe from '../components/recipe/Recipe';
import PostRecipe from '../components/recipe/PostRecipe';
import ScreamSkeleton from '../util/ScreamSkeleton';
import Profile from '../components/profile/Profile';
// Redux
import { connect } from 'react-redux';
import { getRecipes } from '../redux/actions/dataActions';

class Recipes extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }
  render() {
    const isMobile = window.innerWidth <= 500;
    const { recipes, loading } = this.props.data;
    let recentRecipesMarkup = !loading ? (
      recipes.map((recipe) => <Recipe key={recipe.screamId} recipe={recipe} />)
    ) : (
      <ScreamSkeleton />
    );
    const { authenticated } = this.props;

    return (
      <Grid container spacing={16}>
        {(!isMobile) ?
        <Grid item sm={4} xs={12}>
          <Profile/>
          {authenticated ? (
          <PostRecipe />
          ) : ( null ) }
				</Grid>
				: (null) }
        <Grid item sm={8} xs={12}>
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
