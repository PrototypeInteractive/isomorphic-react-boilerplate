import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './containers/main';

const App = () => (
  <Main />
);

ReactDOM.render(<App />, document.getElementById('app'));
