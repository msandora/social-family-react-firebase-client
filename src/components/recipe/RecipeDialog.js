import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";
// Redux stuff
import { connect } from "react-redux";
import { getRecipe, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme,
  cardHandle: {
    display: "inline-block",
  },
  cardHeader: {
    padding: "0 10px 10px 0",
  },
});

class RecipeDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, postId } = this.props;
    const newPath = `/users/${userHandle}/recipe/${postId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getRecipe(this.props.postId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
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
        comments,
      },
      UI: { loading },
    } = this.props;
    const isMobile = window.innerWidth <= 500;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <div>
        <Grid container>
          <Grid item xs={12}>
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
              title={
                <Typography
                  component={Link}
                  color='primary'
                  variant='h5'
                  to={`/users/${userHandle}`}
                  className={classes.cardHandle}
                >
                  @{userHandle}
                </Typography>
              }
              subheader={dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
            />
          </Grid>
        </Grid>
        <Grid container spacing={16}>
          <Grid item sm={12}>
            <hr className={classes.invisibleSeparator} />
            <Typography variant='body1'>{recipeTitle}</Typography>
            <Typography variant='body1'>{recipeType}</Typography>
            <Typography variant='body1'>{ingredients}</Typography>
            <Typography variant='body1'>{body}</Typography>
            <hr className={classes.invisibleSeparator} />
            <LikeButton postId={postId} />
            <span>{likeCount} likes</span>
            <MyButton tip='comments'>
              <ChatIcon color='primary' />
            </MyButton>
            <span>{commentCount} comments</span>
          </Grid>
          <hr className={classes.visibleSeparator} />
          <CommentForm postId={postId} />
          <Comments comments={comments} />
        </Grid>
      </div>
    );

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip='View Comments'>
          <ChatIcon color='primary' />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          fullScreen={isMobile}
          maxWidth='sm'
        >
          <MyButton
            tip='Close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary' autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

RecipeDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getRecipe: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  recipe: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.data.recipe,
  UI: state.UI,
});

const mapActionsToProps = {
  getRecipe,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(RecipeDialog));
