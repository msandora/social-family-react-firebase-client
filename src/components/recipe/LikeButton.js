import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// Redux
import { connect } from "react-redux";
import { likeRecipe, unlikeRecipe } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
  likedRecipe = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.postId === this.props.postId
      )
    )
      return true;
    else return false;
  };
  likeRecipe = () => {
    this.props.likeRecipe(this.props.postId);
  };
  unlikeRecipe = () => {
    this.props.unlikeRecipe(this.props.postId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to='/login'>
        <MyButton tip='Like'>
          <FavoriteBorder color='primary' />
        </MyButton>
      </Link>
    ) : this.likedRecipe() ? (
      <MyButton tip='Undo like' onClick={this.unlikeRecipe}>
        <FavoriteIcon color='primary' />
      </MyButton>
    ) : (
      <MyButton tip='Like' onClick={this.likeRecipe}>
        <FavoriteBorder color='primary' />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likeRecipe: PropTypes.func.isRequired,
  unlikeRecipe: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeRecipe,
  unlikeRecipe,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
