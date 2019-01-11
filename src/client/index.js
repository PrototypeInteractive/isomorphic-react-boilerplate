import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'; // TODO: Use HashRouter if BrowserRouter is not supported (in static build)
import App from './app';
import configurStore from './state/configureStore';

const preloadedState = window.__PRELOADED_STATE__; // eslint-disable-line no-underscore-dangle
delete window.__PRELOADED_STATE__; // eslint-disable-line no-underscore-dangle

const store = configurStore(preloadedState);

const criticalCssTag = document.getElementById('InlineCSS');
if (criticalCssTag) {
  criticalCssTag.remove();
}

ReactDOM.hydrate(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
