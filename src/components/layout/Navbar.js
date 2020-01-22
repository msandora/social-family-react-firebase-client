import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostScream from	'../scream/PostScream';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// Icons
import HomeIcon from '@material-ui/icons/Home';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';


import { withRouter } from 'react-router-dom';    

class Navbar extends Component {
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
							<MyButton tip="Home">
									<HomeIcon />
							</MyButton>
						</Link>
						<Link to="/family-tree">
							<MyButton tip="Family Tree">
									<NaturePeopleIcon />
							</MyButton>
						</Link>
					</Fragment>
				) : (
					<Fragment>
						<Button color="inherit" component={Link} to="/signup">Signup</Button>
						<Button color="inherit" component={Link} to="/login">Login</Button>
						<Button color="inherit" component={Link} to="/">Home</Button>
						<Button color="inherit" component={Link} to="/family-tree">Family Tree</Button>
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
  