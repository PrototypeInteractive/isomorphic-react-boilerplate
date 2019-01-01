/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom'; // TODO: Use HashRouter if BrowserRouter is not supported (in static build)
import { hot } from 'react-hot-loader/root';
import { withRouter } from 'react-router';
import Routes from './routes';

export class App extends Component {
  componentDidMount() {
    // Initialize culture-agnostic global settings here
  }

  render() {
    return (
      <Switch>
        <Route path="/ar" render={(props) => <Routes rootPath="" basePath="/ar" lang="ar" {...props} />} />
        <Route path="/" render={(props) => <Routes rootPath="" basePath="" lang="en" {...props} />} />
      </Switch>
    );
  }
}

const mapDispatchToProps = dispatch => ({ // eslint-disable-line no-unused-vars
});

const mapStateToProps = state => ({ // eslint-disable-line no-unused-vars
});

// Use withRouter() to prevent connect() from preventing router updates. See ReadMe.md issues for details.
const reduxApp = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

const HotApp = hot(reduxApp);

HotApp.TestString = 'Test!!!!';

export default HotApp;
