import {
  SET_VERSION
} from './actions';

const initState = {
  version: '1.0.0'
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case SET_VERSION:
      return {
        ...state,
        version: action.data
      };
    default:
      return state;
  }
}
