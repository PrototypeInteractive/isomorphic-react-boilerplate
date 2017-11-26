import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
  <a className="btn btn-default" href={props.href}>
    <span>{props.label}</span>
  </a>
);

Button.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string.isRequired
};

Button.defaultProps = {
  href: 'javascript: void(0);'
};

export default Button;
