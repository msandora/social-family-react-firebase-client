import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import DeleteRecipe from "./DeleteRecipe";
import RecipeDialog from "./RecipeDialog";
import LikeButton from "./LikeButton";
//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme,
});

class Recipe extends Component {
  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      recipe: {
        body,
        createdAt,
        userImage,
        userHandle,
        postId,
        recipeTitle,
        recipeType,
        ingredients,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteRecipe postId={postId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar
              alt='Profile image'
              src={userImage}
              component={Link}
              to={`/users/${userHandle}`}
            />
          }
          action={<div>{deleteButton}</div>}
          title={userHandle}
          subheader={dayjs(createdAt).fromNow()}
        />

        <CardContent className={classes.cardContent}>
          <Typography variant='body2'>Title: {recipeTitle}</Typography>
          <Typography variant='body2'>Type: {recipeType}</Typography>

          <Typography variant='body2'>Directions:
          {body.split('\n').map((item, key) => {
            return <Fragment key={key}>{item}<br/></Fragment>
          })}
          </Typography>
          <Typography variant='body2'>Ingredients:
          {ingredients.split('\n').map((item, key) => {
            return <Fragment key={key}>{item}<br/></Fragment>
          })}
          </Typography>
        </CardContent>

        <CardActions className={classes.cardActions}>
          <LikeButton postId={postId} />
          <span>{likeCount} Likes</span>
          <RecipeDialog
            postId={postId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
          <span>{commentCount} Comments</span>
        </CardActions>
      </Card>
    );
  }
}

Recipe.propTypes = {
  user: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Recipe));
