import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './containers/main';

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('app'),
  );
};

render(Main);

if (module.hot) {
  module.hot.accept('./containers/main', () => {
    render(Main);
    console.log('app: Main module updated.');
  });
}
