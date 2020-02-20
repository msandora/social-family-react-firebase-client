import React from "react";
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import tileData from '../data/gallery';
import Profile from '../components/profile/Profile';

// Mui
import withStyles from "@material-ui/core/styles/withStyles";
import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
// redux
import { connect } from 'react-redux';
// import { getRecipes } from '../redux/actions/dataActions';

const styles = (theme) => ({
	...theme,
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
	},
	gridList: {
		// backgroundColor: theme.palette.background.paper,
		height: 'auto !important',
		padding: '5px !important'
	},
	titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
			'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
			height: 55,
  },
	gridImage: {
		top: '0',
		left: '0',
		width: '100% !important',
		transform: 'translateX(0)'
	}
});

class Gallery extends React.Component {
  render() {
    const { classes, width } = this.props;
    let columns = width === 'xs' ? 2 : 3;


    // const { authenticated } = this.props;
    return (
      <Grid container spacing={16}>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
        <Grid item sm={8} xs={12}>
          <GridList cols={columns} >
              {tileData.map(tile => (
              <GridListTile key={tile.postId} className={classes.gridList}>
                  <img src={tile.img} alt={tile.title} className={classes.gridImage}/>
                  <GridListTileBar
                      title={ tile.title }
                      subtitle={<span>by: {tile.author}</span>}
                      actionIcon={
                        <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                          <InfoIcon />
                        </IconButton>
                      }
                      className={classes.titleBar}
                  />
              </GridListTile>
              ))}
          </GridList>
        </Grid>
      </Grid>
    );
  }
}

Gallery.propTypes = {
  getRecipes: PropTypes.func,
  data: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data,
  authenticated: state.user.authenticated
});

export default compose(
  withStyles(styles),
  withWidth(),
  connect(mapStateToProps),
)(Gallery);
