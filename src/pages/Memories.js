import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import compose from "recompose/compose";

// import withStyles from "@material-ui/core/styles/withStyles";
import withWidth from "@material-ui/core/withWidth";
// Components
import Memory from "../components/memory/Memory";
import PostMemory from "../components/memory/PostMemory";
import ScreamSkeleton from "../util/ScreamSkeleton";
import Profile from "../components/profile/Profile";
// Redux
import { connect } from "react-redux";
import { getRecipes } from "../redux/actions/dataActions";

class Memories extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }
  render() {
    // const { width } = this.props;
    // let columns = width === 'xs' ? 2 : 3;

    const isMobile = window.innerWidth <= 500;
    const { recipes, loading } = this.props.data;
    let recentRecipesMarkup = !loading ? (
      recipes.map((recipe) => <Memory key={recipe.postId} recipe={recipe} />)
    ) : (
      <ScreamSkeleton />
    );
    const { authenticated } = this.props;

    return (
      <Grid container spacing={16}>
        {!isMobile ? (
          <Grid item sm={4} xs={12}>
            <Profile />
            {authenticated ? <PostMemory /> : null}
          </Grid>
        ) : null}
        <Grid item sm={8} xs={12}>
          {recentRecipesMarkup}
        </Grid>
      </Grid>
    );
  }
}

Memories.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  authenticated: state.user.authenticated,
});

export default compose(
  //withStyles(styles),
  withWidth(),
  connect(mapStateToProps, { getRecipes })
)(Memories);
