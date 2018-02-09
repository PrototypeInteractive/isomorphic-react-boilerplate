import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import Main from './containers/main';
import InnerPage from './containers/inner-page';
import Routes from './routes';

export class App extends Component {
  constructor(props) {
    super(props);
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

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
