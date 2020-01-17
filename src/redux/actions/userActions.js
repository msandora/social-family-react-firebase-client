import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
	dispatch({ type: LOADING_UI });

	axios
		.post('/login', userData)
		.then((res) => {
			console.log(res.data);
			const FBIdToken = `Bearer ${res.data.token}`;
			localStorage.setItem('FBIdToken', FBIdToken);
			axios.defaults.headers.common['Authorization'] = FBIdToken;
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });
			history.push('/');
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.data
			})
		});
}

export const getUserData = () => (dispatch) => {
	axios.get('/users')
		.then((res) => {
			dispatch({
				type: SET_USER,
				payload:res.data
			})
		})
		.catch((err) => console.log(err));
}