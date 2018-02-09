import { combineReducers } from 'redux';
import userData from './user-data/reducer';
import appData from './app-data/reducer';

const reducer = combineReducers({
  userData,
  appData
});

export default reducer;
