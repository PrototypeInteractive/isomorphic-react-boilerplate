import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import Main from './containers/main';
import InnerPage from './containers/inner-page';
import { NotFound } from './containers/errors';

export class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const prefix = this.props.match.url.replace(/\/+$/, '');
    const outerProps = {
      basePath: this.props.basePath,
      lang: this.props.lang
    }

    return (
      <div className="app-root">
        <Helmet titleTemplate="%s - Website Name" defaultTitle="Home">
          <meta name="description" content="Lorem ipsum dolor sit amet" />
        </Helmet>
        <Switch>
          <Route path="/ar" render={() => (
            <Helmet htmlAttributes={{ lang: 'ar', dir: 'rtl' }} />
          )} />
          <Route render={() => (
            <Helmet htmlAttributes={{ lang: 'en', dir: 'ltr' }} />
          )} />
        </Switch>

        <Switch>
          <Route exact path={`${this.props.match.url}`} render={(props) => <Main {...props} {...outerProps} />} />
          <Route path={`${prefix}/inner-page`} render={(props) => <InnerPage {...props} {...outerProps} />} />
          <Route render={(props) => <NotFound {...props} {...outerProps} />} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
