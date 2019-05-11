//import {TEST_DISPATCH} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';
import {GET_ERRORS, SET_CURRENT_USER} from './types';

/*
export const registerUser = userData => {
    return {
        type: TEST_DISPATCH,
        payload: userData
    };
}
*/

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/user/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - Get User Token
export const LoginUser = userData => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {

            // Save to localstorage
            const {token} = res.data;

            // Set token to ls
            localStorage.setItem('jwtToken', token);

            // Set token to Auth header
            setAuthToken(token);

            // Decode token to get user data
            const decoded = jwt_decode(token);

            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user (현재 유저에 대한 정보)
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};