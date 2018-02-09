import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Button = props => (
  <a className="testButton btn btn-default" href={props.href} onClick={props.onClick}>
    <span>{props.label}</span>
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
