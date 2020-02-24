import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';    
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import Notifications from './Notifications';
import UserDrawer from '../profile/UserDrawer';

//MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// Icons
import HomeIcon from '@material-ui/icons/Home';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';

//Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
	appBar: {
		top: 'auto',
		bottom: 0,
	},
	grow: {
		flexGrow: 1,
	}
});

class Mobilebar extends Component {
	handleOnClick = () => {
		// Reset scroll bar 
		window.scrollTo(0, 0);
	}
	render() { 
		const { authenticated, classes } = this.props;

		return ( 
			<AppBar position="fixed" color="primary" className={classes.appBar}>
				<Toolbar className="nav-container">
					<Fragment>
						<div className={classes.grow} />
						<Link to="/">
							<MyButton tip="Home" onClick={this.handleOnClick}>
								<HomeIcon />
							</MyButton>
						</Link>
						<Link to="/family-tree">
							<MyButton tip="Family Tree" onClick={this.handleOnClick}>
								<NaturePeopleIcon />
							</MyButton>
						</Link>
						<Link to="/recipes">
							<MyButton tip="Family Recipes" onClick={this.handleOnClick}>
								<RestaurantMenuIcon />
							</MyButton>
						</Link>
						<Link to="/gallery">
							<MyButton tip="Photo Gallery" onClick={this.handleOnClick}>
								<PhotoLibrary />
							</MyButton>
						</Link>
						{authenticated ? (
						<Fragment>
							<Notifications />
							<UserDrawer/>
						</Fragment>
						) : ( null ) }
					</Fragment>
				</Toolbar>
			</AppBar>
		);
	}
}
 

Mobilebar.propTypes = {
	authenticated: PropTypes.bool.isRequired
};
  
const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated
});
  
export default connect(mapStateToProps)(withStyles(styles)(withRouter(Mobilebar)));
  

