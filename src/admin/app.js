/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Routes from './routes';

export class App extends Component {
  componentDidMount() {
    // Initialize culture-agnostic global settings here
  }

  render() {
    return (
      <Router>
        {/* Define cultures. */}
        <Switch>
          <Route path="/admin/ar" render={(props) => <Routes rootPath="/admin" basePath="/admin/ar" lang="ar" {...props} />} />
          <Route path="/admin" render={(props) => <Routes rootPath="/admin" basePath="/admin" lang="en" {...props} />} />
        </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({ // eslint-disable-line no-unused-vars
});

const mapStateToProps = state => ({ // eslint-disable-line no-unused-vars
});

const reduxApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default hot(module)(reduxApp);
