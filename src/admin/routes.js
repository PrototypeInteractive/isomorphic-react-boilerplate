import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import Main from './containers/main';
import InnerPage from './containers/inner-page';
import { NotFound } from './containers/errors';
import Utilities from './common/utiltiies';
import Labels from './assets/strings/labels.json';
import { setLabels } from './state/app-data/actions';

export class Routes extends Component {
  static propTypes = {
    // Router
    match: PropTypes.object.isRequired,

    // Redux
    labels: PropTypes.object.isRequired,
    setLabels: PropTypes.func.isRequired,

    // Component
    lang: PropTypes.string.isRequired,
    basePath: PropTypes.string.isRequired
  };

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
    const prefix = this.props.match.url.replace(/\/+$/, ''); // Trim trailing slashes
    const outerProps = {
      basePath: this.props.basePath,
      lang: this.props.lang
    };

    return (
      <div className="app-root">
        <Helmet titleTemplate={`%s - ${this.props.labels.WebsiteName}`} />
        <Switch>
          <Route path="/ar" render={() => <Helmet htmlAttributes={{ lang: 'ar', dir: 'rtl' }} />} />
          <Route render={() => <Helmet htmlAttributes={{ lang: 'en', dir: 'ltr' }} />} />
        </Switch>

        <Switch>
          {/* Homepage */}
          <Route exact path={`${this.props.match.url}`} render={props => <Main {...props} {...outerProps} />} />

          {/* Inner Page */}
          <Route path={`${prefix}/inner-page`} render={props => <InnerPage {...props} {...outerProps} />} />

          {/* 404 Page */}
          <Route render={props => <NotFound {...props} {...outerProps} />} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setLabels: (data) => dispatch(setLabels(data))
});

const mapStateToProps = state => ({
  labels: state.appData.labels
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
