import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import Main from './containers/main';
import InnerPage from './containers/inner-page';
import { NotFound } from './containers/errors';
import Utilities from './common/utiltiies';
import Labels from './assets/strings/labels.json';
import { setLabels } from './state/app-data/actions';

export class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: {}
    }
  }

  componentDidMount() {
    const labels = Utilities.getLabels(Labels, this.props.lang);
    this.props.setLabels(labels);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      const labels = Utilities.getLabels(Labels, nextProps.lang);
      this.props.setLabels(labels);
    }
  }

  render() {
    const prefix = this.props.match.url.replace(/\/+$/, '');
    const outerProps = {
      basePath: this.props.basePath,
      lang: this.props.lang
    }

    return (
      <div className="app-root">
        <Helmet titleTemplate="%s - Website Name" />
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
  setLabels: (data) => dispatch(setLabels(data)),
});

const mapStateToProps = state => ({
  strings: state.strings
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
