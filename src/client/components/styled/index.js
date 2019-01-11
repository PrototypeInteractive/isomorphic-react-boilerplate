/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

const Styled = ({ style, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext && staticContext.addStyle) {
      staticContext.addStyle((style || '').toString());
    }

    return children;
  }}
  />
);

Styled.propTypes = {
  style: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired
};

export default Styled;
