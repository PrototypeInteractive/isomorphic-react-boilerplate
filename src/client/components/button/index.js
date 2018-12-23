import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Button = ({ href, label, onClick }) => (
  <a className="testButton btn btn-default" href={href} onClick={onClick}>
    <span>{label}</span>
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
