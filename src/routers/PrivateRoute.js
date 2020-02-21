import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ //props
	authenticated, 
	component: Component,
	...rest
}) => (
	<Route {...rest} component={(props) => (
		authenticated ? (
			<Component {...props} />
		) : (
			<Redirect to="/" />
		)
	)}/>
);

const mapStateToProps = (state) => ({
	authenticated: !!state.user.authenticated // provide boolean
});

PrivateRoute.propTypes = {
	user: PropTypes.object
};

export default connect(mapStateToProps)(PrivateRoute);