import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => (
  <div className="icon">
    <span>{props.alt}</span>
  </div>
);

Icon.propTypes = {
  alt: PropTypes.string
};

Icon.defaultProps = {
  alt: ''
};

export default Icon;
