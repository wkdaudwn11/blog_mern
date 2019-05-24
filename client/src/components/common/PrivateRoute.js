// 인증 절차 모듈

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest}) => (
    <Route
        {...rest}
        render={props => 
            auth.isAuthenticated === true ? ( // 인증이 됐으면
                <Component {...props} />

            ) : ( // 인증이 안됐으면
                <Redirect to="/login" />
            )
        }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);