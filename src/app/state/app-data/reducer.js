import {
  SET_VERSION,
  SET_LABELS
} from './actions';

const initState = {
  version: '1.0.0',
  homepage: '/',
  labels: {}
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case SET_VERSION:
      return {
        ...state,
        version: action.data
      };
    case SET_LABELS:
      return {
        ...state,
        labels: action.data
      };
    default:
      return state;
  }
}
