import axios from 'axios';

import {
    GET_PROFILE,
    PROFILE_LOADING,
<<<<<<< b73b604edeb16945b74bb96fa86c3eaa883ecc0b
    CLEAR_CURRNT_PROFILE
=======
    CLEAR_CURRNT_PROFILE,
    GET_ERRORS,
    SET_CURRENT_USER
>>>>>>> Profile actions component & delete account
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading()); // dispatch는 비동기
    axios
        .get('/api/profile')
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data // 데이터를 담는 그릇
            })
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRNT_PROFILE
    };
<<<<<<< b73b604edeb16945b74bb96fa86c3eaa883ecc0b
=======
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios
        .post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

// Create Profile
export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')){
        axios
            .delete('/api/profile')
            .then(res =>
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })    
            )
            .catch(err => 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    }
>>>>>>> Profile actions component & delete account
};