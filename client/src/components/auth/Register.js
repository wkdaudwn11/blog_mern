import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import axios from 'axios';
import {withRouter} from 'react-router-dom';

import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';

class Register extends Component {

    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    // prop를 받을 때 실행되는 함수
    // 리액트 생명주기에서는 componentDidMount를 제일 많이 씀
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){ // nextProps에 에러가 존재한다면..
            this.setState({ errors: nextProps.errors }); // state의 errors값을 변경
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        //axios는 통신
        /*
        axios
            .post('/api/user/register', newUser) // 어디로 무엇을 보낼지
            .then(res => console.log(res.data)) // 성공
            .catch(err => this.setState({errors: err.response.data})); // 실패
        */
       this.props.registerUser(newUser, this.props.history); // history는 redux dev tool 에 찍기 위함
    }

    render() {

        const {errors} = this.state;
        const {user} = this.props.auth; // props.auth를 user로 규정.

        return (
            <div className="register">
                {user ? user.name : null} {/** user가 참이면 이름이 찍히고 거짓이면 아무것도 안찍힘 (걍 테스트용) */}
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">
                                Create your DevConnector account
                            </p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.name
                                        })}
                                        placeholder="Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        required
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.email
                                        })}
                                        placeholder="Email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        required
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                    <small className="form-text text-muted">
                                        This site uses Gravatar so if you want a profile image, use a Gravatar email
                                    </small>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.password
                                        })}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        required
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.password2
                                        })}
                                        placeholder="repeat password"
                                        name="password2"
                                        value={this.state.password2}
                                        onChange={this.onChange}
                                        required
                                    />
                                    {errors.password2 && (
                                        <div className="invalid-feedback">{errors.password2}</div>
                                    )}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" value="Sign Up" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
/** 
 * proptypes랑 Proptypes랑 다른 것임..대문자는 내가 import 받은 거 
 * 소문자는 react의 내장되어 있는 함수
 */
Register.propTypes = { 
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

//export default Register;

// register파일에 요청이 들어오고나서 처리를 한 후
// 에러가 있을 수도 있고 정상적인 처리 일 수도 있는데
// 그때 처리한 상태값을 prop으로 전달
export default connect(mapStateToProps, {registerUser})(withRouter(Register));