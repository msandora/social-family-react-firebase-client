import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import DeleteScream from "../../components/scream/DeleteScream";
import ScreamDialog from "./ScreamDialog";
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

class Scream extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.postId === this.props.scream.postId
      )
    )
      return true;
    else return false;
  };
  likeScream = () => {
    this.props.likeScream(this.props.scream.postId);
  };
  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.postId);
  };
  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        postId,
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
        <DeleteScream postId={postId} />
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
          <Typography variant='body2'>{body}</Typography>
        </CardContent>

        <CardActions className={classes.cardActions}>
          <LikeButton postId={postId} />
          <span>{likeCount} Likes</span>
          <ScreamDialog
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

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
