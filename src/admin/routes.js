import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import Main from './containers/main';
import InnerPage from './containers/inner-page';
import { NotFound } from './containers/errors';
import Utilities from './common/utiltiies';
import Labels from './assets/strings/labels.json';
import { setLabels } from './state/app-data/actions';

export const routes = [
  {
    path: '/', exact: true, component: Main
  },
  {
    path: '/inner-page', exact: true, component: InnerPage
  },
  {
    errorCode: 404, component: NotFound
  }
];

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
    const { lang, setLabels } = this.props;

    const labels = Utilities.getLabels(Labels, lang);
    setLabels(labels);
  }

  componentWillReceiveProps(nextProps) {
    const { lang, setLabels } = this.props;

    if (lang !== nextProps.lang) {
      const labels = Utilities.getLabels(Labels, nextProps.lang);
      setLabels(labels);
    }
  }

  render() {
    const {
      match, rootPath, basePath, lang, labels
    } = this.props;

    const prefix = match.url.replace(/\/+$/, ''); // Trim trailing slashes
    const outerProps = {
      rootPath,
      basePath,
      lang
    };

    return (
      <div className="app-root">
        <Helmet titleTemplate={`%s - ${labels.WebsiteName}`} />
        <Switch>
          <Route path="/admin/ar" render={() => <Helmet htmlAttributes={{ lang: 'ar', dir: 'rtl' }} />} />
          <Route render={() => <Helmet htmlAttributes={{ lang: 'en', dir: 'ltr' }} />} />
        </Switch>

        <Switch>
          {/* Render container components */}
          {routes.map(route => {
            let path = (route.path || '').trim();
            path = `${prefix}${path}`.replace(/\/\//g, '/');

            const key = `key_${(route.path || path.errorCode)}`;

            if (route.errorCode) {
              return <Route key={key} render={props => <route.component {...props} {...outerProps} />} />;
            }

            return <Route key={key} exact={route.exact} path={path} render={props => <route.component {...props} {...outerProps} />} />;
          })}
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

// Use withRouter() to prevent connect() from preventing router updates. See ReadMe.md issues for details.
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
