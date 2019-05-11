//import {TEST_DISPATCH} from './types';
import axios from 'axios';
import {GET_ERRORS} from './types';

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