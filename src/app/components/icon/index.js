/*
* Component for using SVG icons
*
* Icon types are based on SVG files located inside ./src/app/assets/icons/ directory
* Which are then compiled into ./src/app/assets/images/icons.svg
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import icons from '../../assets/images/icons.svg';

export default class Icon extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    className: '',
    width: null,
    height: null
  }

  render() {
    return (
      <svg
        className={`icon ${this.props.className}`}
        width={this.props.width}
        height={this.props.height}
        aria-hidden="true"
        role="presentation"
      >
        <use xlinkHref={`${icons}#icon-${this.props.type}`} />
      </svg>
    );
  }
}
