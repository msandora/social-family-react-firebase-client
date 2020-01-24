import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
  ...theme,
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '10%'
  },
  commentData: {
    marginLeft: 20
  },
  cardHeader: {
    padding: '0 10px 10px 0'
  }
});

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid container>
                <Grid item xs={12}>
                  <CardHeader className={classes.cardHeader}
                  avatar={
                  <Avatar alt="Profile image" src={userImage} 					
                  component={Link}
                  to={`/users/${userHandle}`}/>
                  }
                  title={
                  <Typography
                  component={Link}
                  color="primary"
                  variant="h5"
                  to={`/users/${userHandle}`}
                  >
                  @{userHandle}
                  </Typography>
                  }
                  subheader={dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={16}>
                <Grid item>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body1">{body}</Typography>	
                <hr className={classes.invisibleSeparator} />
                </Grid>
              </Grid>   
              {index !== comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
