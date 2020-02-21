import React from 'react';
import AppIcon from '../images/icon.png';
// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  ...theme
});

const NotFoundPage = ({ classes }) => (
  <Grid container className={classes.form}>
      <Grid item xs={12}>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h4">404! Are you Lost?</Typography>
          <Button
            href="/"
            variant="contained"
            color="primary"
            className={classes.button}>Go Home</Button>
      </Grid>
  </Grid>
);

export default withStyles(styles)(NotFoundPage);
