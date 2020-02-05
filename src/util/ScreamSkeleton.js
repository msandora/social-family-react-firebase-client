import React, { Fragment } from 'react';
import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types';

import MyButton from '../util/MyButton';
// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

const styles = (theme) => ({
  ...theme,
  card: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 10
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: 'rgba(0,0,0, 0.3)',
  },
  fullLine: {
    height: 15,
    width: '90%',
    backgroundColor: 'rgba(0,0,0, 0.6)',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    width: '50%',
    backgroundColor: 'rgba(0,0,0, 0.6)',
    marginBottom: 10
  }
});

const ScreamSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardHeader 
        avatar={
          <Avatar alt="Profile image" src={NoImg} />
        }>
        <div className={classes.handle} />
        <div className={classes.date} />
      </CardHeader>
      <CardContent className={classes.cardContent}>
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
      {/** 
            <CardActions>
        <div className={classes.handle} />
        <div className={classes.date} />
      </CardActions>*/}
      <CardActions>
        <MyButton tip="Like">
          <FavoriteIcon color="primary"/>
        </MyButton>
        <div className={classes.date} />
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <div className={classes.date} />
      </CardActions>

    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

ScreamSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScreamSkeleton);
