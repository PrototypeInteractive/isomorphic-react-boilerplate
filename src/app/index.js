import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Main from './containers/main';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Main);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(Main);
  });
}

const App = () => (
  <Main />
);

ReactDOM.render(<App />, document.getElementById('app'));
