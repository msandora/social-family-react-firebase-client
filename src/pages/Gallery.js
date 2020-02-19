import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from '../data/gallery';


const styles = (theme) => ({
	...theme,
	root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // backgroundColor: theme.palette.background.paper,
		overflow: 'hidden'
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  }
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

class Gallery extends Component {
	state = { }
	render() { 
    const { classes } = this.props;
		return (
			<div className={classes.root}>
				<GridList cellHeight={180} className={classes.gridList}>
					<GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
						<ListSubheader component="div">Gallery</ListSubheader>
					</GridListTile>
					{/** */}
					{tileData.map(tile => (
						<GridListTile key={tile.postId}>
							<img src={tile.img} alt={tile.title} />
							<GridListTileBar
								title={tile.title}
								subtitle={<span>by: {tile.author}</span>}
								actionIcon={
									<IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
										<InfoIcon />
									</IconButton>
								}
							/>
						</GridListTile>
					))}
				</GridList>
			</div>
		);
	}
}
 
export default withStyles(styles)(Gallery);