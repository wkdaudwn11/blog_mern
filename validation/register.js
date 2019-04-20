const validator = require('validator');
const isEmpty = require('./is-empty');

// 검증해주는 함수를 만들고 바로 내보냄
module.exports = function validateRegisterInput(data) {
    let errors = {};

    // 여기서 쓰이는 isEmpty는 is-empty.js에서 만든 친구
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(!validator.isLength(data.name, {min:2, max:30})){
        errors.name = 'Name must be between 2 and 30 characters';
    }

    // 여기서 쓰이는 isEmpty는 validator에서 제공해주는 함수
    if(validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }

    if(!validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    if(validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }

    if(!validator.isLength(data.password, {min:6, max:30})){
        errors.password = 'Password must be between 6 and 30 characters';
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'password field is required';
    }

    if(validator.isEmpty(data.password2)){
        errors.password2 = 'password2 field is required';
    }

    if(!validator.equals(data.password, data.password2)){
        errors.password2 = 'password must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}