/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Routes from './routes';

export class App extends Component {
  componentDidMount() {
    // TODO: Initialize culture-agnostic global settings here
  }

  render() {
    return (
      <Router>
        {/* Define cultures. */}
        <Switch>
          <Route path="/ar" render={(props) => <Routes basePath="/ar" lang="ar" {...props} />} />
          <Route path="/" render={(props) => <Routes basePath="" lang="en" {...props} />} />
        </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({ // eslint-disable-line no-unused-vars
});

const mapStateToProps = state => ({ // eslint-disable-line no-unused-vars
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
