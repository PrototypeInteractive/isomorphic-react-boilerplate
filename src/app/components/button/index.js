import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
  <a className="btn btn-default" href={props.href} onClick={props.onClick}>
    <span>_{props.label}</span>
  </a>
);

Button.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

Button.defaultProps = {
  href: 'javascript: void(0);',
  onClick: () => {}
};

export default Button;
