import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

const NotFound = ({ basePath }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.statusCode = 404;
    }

    return (
      <section className="innerPage">
        <Helmet>
          <title>Not Found</title>
          <meta name="description" content="The page was not found" />
        </Helmet>

        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>Not Found</h1>
              <div><Link to={`${basePath}/`}>Home</Link></div>
            </div>
          </div>
        </div>
      </section>
    );
  }}
  />

);

NotFound.propTypes = {
  basePath: PropTypes.string.isRequired
};

export default NotFound;
