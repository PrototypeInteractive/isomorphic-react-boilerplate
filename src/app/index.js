import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Main from './containers/main';
import configurStore from './state/configureStore';
import './assets/sass/style.scss';

const store = configurStore();

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('app'),
  )
}

render(Main)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/main', () => { render(Main) })
}
