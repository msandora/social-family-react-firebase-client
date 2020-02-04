import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';    
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import Notifications from './Notifications';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// Icons
import HomeIcon from '@material-ui/icons/Home';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
//Redux
import { connect } from 'react-redux';

class Navbar extends Component {
	handleOnClick = () => {
		// Reset scroll bar
		window.scrollTo(0, 0);
	}
	render() { 
		const { authenticated } = this.props;
		return ( 
			<AppBar>
				<Toolbar className="nav-container">
				{authenticated ? (
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
						<Notifications />
					</Fragment>
				) : (
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
					</Fragment>
				)}
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
  
export default connect(mapStateToProps)(withRouter(Navbar));
  