/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { setVersion } from '../../state/app-data/actions';
import { setName } from '../../state/user-data/actions';

export class InnerPage extends Component {
  static propTypes = {
    basePath: PropTypes.string.isRequired
  }

  render() {
    return (
      <section className="innerPage">
        <Helmet>
          <title>Inner Page</title>
          <meta name="description" content="Inner page description" />
        </Helmet>

        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>Inner page!</h1>
              <div><Link to={`${this.props.basePath}/`}>Home</Link></div>
              <div><Link to="/inner-page">English</Link></div>
              <div><Link to="/ar/inner-page">Arabic</Link></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setVersion: (data) => dispatch(setVersion(data)),
  setName: (data) => dispatch(setName(data))
});

const mapStateToProps = state => ({
  appData: state.appData,
  userData: state.userData
});

export default connect(mapStateToProps, mapDispatchToProps)(InnerPage);
