import React from 'react';
import PropTypes from 'prop-types';
import Styled from '../styled';
import style from './style.scss';

const Button = ({ href, label, onClick }) => (
  <Styled style={style}>
    <a className="testButton btn btn-default" href={href} onClick={onClick}>
      <span>{label}</span>
    </a>
  </Styled>
);

Button.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

Button.defaultProps = {
  href: 'javascript: void(0);',
  onClick: () => { }
};

export default Button;
