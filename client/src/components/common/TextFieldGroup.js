// <input />  태그를 모듈화해서 소스를 간결하게 쓸 수 있음

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    info,
    error,
    type,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input
                type={type}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <small className="invalid-feedback">{error}</small>}
        </div>
    );
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
};

TextFieldGroup.defulatProps = {
    type: 'text'
};

export default TextFieldGroup;