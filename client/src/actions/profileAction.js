import axios from 'axios';

import {
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRNT_PROFILE
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
};