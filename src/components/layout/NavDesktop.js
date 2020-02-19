import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';    
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import Notifications from './Notifications';
// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// Icons
import HomeIcon from '@material-ui/icons/Home';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import PersonIcon from '@material-ui/icons/Person';

//Redux
import { connect } from 'react-redux';


const styles = (theme) => ({
	grow: {
		flexGrow: 1,
	}
});

class Navbar extends Component {
	handleOnClick = () => {
		// Reset scroll bar
		window.scrollTo(0, 0);
	}
	render() { 
		const { authenticated, classes } = this.props;
		return ( 
			<AppBar>
				<Toolbar className="nav-container"> 
					<Fragment>
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
						<div className={classes.grow} />
						{authenticated ? (
						<Fragment>
							<Notifications />
							<Link to="/gallery">
								<MyButton tip="My Profile" onClick={this.handleOnClick}>
									<PersonIcon />
								</MyButton>
							</Link>
						</Fragment>
						) : ( null ) }
					</Fragment>
				</Toolbar>
			</AppBar>
		);
	}
}
 
Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired
};
  
const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated
});
  
export default connect(mapStateToProps)(withStyles(styles)(withRouter(Navbar)));
