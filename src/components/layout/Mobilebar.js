import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';    
import PropTypes from 'prop-types';

import MyButton from '../../util/MyButton';
import PostScream from	'../scream/PostScream';
import Notifications from './Notifications';


//MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import PersonIcon from '@material-ui/icons/Person';

//Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
	appBar: {
		top: 'auto',
		bottom: 0,
	},
	grow: {
		flexGrow: 1,
	},
	fabButton: {
		position: 'absolute',
		zIndex: 1,
		top: -30,
		left: 0,
		right: 0,
		margin: '0 auto',
		color: '#fff',
    backgroundColor: '#ff3d00'
	}
});

class Mobilebar extends Component {
	handleOnClick = () => {
		// Reset scroll bar
		window.scrollTo(0, 0);
	}
	render() { 
		const { authenticated, classes, location } = this.props;
		const hidePostButton = location.pathname.match('/family-tree');

		return ( 
			<AppBar position="fixed" color="primary" className={classes.appBar}>
				<Toolbar>
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
						{!hidePostButton ? (
							<div color="secondary" aria-label="add" className="mobile-post-btn">
								<PostScream />
							</div>
							) : ( null )
						}
						<div className={classes.grow} />
						<Notifications />

						<IconButton edge="end" color="inherit">
							<PersonIcon />
						</IconButton>
					</Fragment>
				) : (
					<Fragment>
						<Button color="inherit" component={Link} to="/signup" onClick={this.handleOnClick}>Signup</Button>
						<div className={classes.grow} />
						<Button color="inherit" component={Link} to="/login" onClick={this.handleOnClick}>Login</Button>
					</Fragment>
				)}
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
  

