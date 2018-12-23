import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const middleware = [thunk, ReduxPromise];

if (process.env.CLIENT_ENV === 'development') {
  const logger = createLogger();
  middleware.push(logger);
}

export default function configureStore() {
  const store = compose(applyMiddleware(...middleware))(createStore)(reducers);

  return store;
}
