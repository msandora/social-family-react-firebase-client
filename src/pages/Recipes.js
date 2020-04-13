import React, { Component } from "react";
import LazyLoad from "react-lazyload";
import PropTypes from "prop-types";
// Mui
import Grid from "@material-ui/core/Grid";
// Components
import Recipe from "../components/recipe/Recipe";
import Profile from "../components/profile/Profile";
import ScreamSkeleton from "../util/ScreamSkeleton";
import Spinner from "../util/Spinner";
import PostRecipe from "../components/recipe/PostRecipe";
// Redux
import { connect } from "react-redux";
import { getRecipes } from "../redux/actions/dataActions";

class Recipes extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }
  render() {
    const isMobile = window.innerWidth <= 500;
    const { recipes, loading } = this.props.data;
    const { authenticated } = this.props;

    let recentRecipesMarkup = !loading ? (
      recipes.map((recipe) => (
        <LazyLoad
          key={recipe.screamId}
          height={100}
          offset={[-100, 100]}
          placeholder={<Spinner />}
        >
          <div className='post'>
            <Recipe key={recipe.screamId} recipe={recipe} />
          </div>
        </LazyLoad>
      ))
    ) : (
      <ScreamSkeleton />
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={4} xs={12}>
          {!isMobile ? <Profile /> : null}

          {authenticated ? <PostRecipe /> : null}
        </Grid>
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
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { getRecipes })(Recipes);
