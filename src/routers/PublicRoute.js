import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = ({ //props
	authenticated, 
	component: Component,
	...rest
}) => (
	<Route {...rest} component={(props) => (
		authenticated ? (
			<Redirect to="/login" />
		) : (
			<Component {...props} />
		)
	)}/>
);

const mapStateToProps = (state) => ({
	authenticated: !!state.user.authenticated // provide boolean
});

PublicRoute.propTypes = {
  user: PropTypes.object
};

export default connect(mapStateToProps)(PublicRoute);