import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';    
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostScream from	'../scream/PostScream';
import Notifications from './Notifications';

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// Icons
import HomeIcon from '@material-ui/icons/Home';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
//Redux
import { connect } from 'react-redux';



class Navbar extends Component {
	handleOnClick = () => {
		// Reset scroll bar
		window.scrollTo(0, 0);
	}
	render() { 
		const { authenticated, location } = this.props;
		const hidePostButton = location.pathname.match('/family-tree');
		return ( 
			<AppBar>
				<Toolbar className="nav-container">
				{authenticated ? (
					<Fragment>
						{!hidePostButton ? (
							<PostScream />
							) : ( null )
						}
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
						<Notifications />
					</Fragment>
				) : (
					<Fragment>
						<Button color="inherit" component={Link} to="/signup" onClick={this.handleOnClick}>Signup</Button>
						<Button color="inherit" component={Link} to="/login" onClick={this.handleOnClick}>Login</Button>
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
  