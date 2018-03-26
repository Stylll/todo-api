import React from 'react';
import PropTypes from 'prop-types';
import Display from './Display';

const TextInput = ({ name, type, value, label, onChange, error, placeholder }) => {
  return (
    <div className="row">
      <div className="input-field col s12">
        <Display check={placeholder}>
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
        </Display>
        <Display check={!placeholder}>
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
          />
          <label htmlFor={name}>{label}</label>
        </Display>
        {error && <span className="red-text errors" id={name + '-error'}>{error}</span>}
      </div>
    </div>
  );
};

// set proptypes
TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string
};

// set default values for non required props
TextInput.defaultProps = {
  label: '',
  error: '',
  placeholder: ''
};

export default TextInput;