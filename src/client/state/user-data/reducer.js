import {
  SET_NAME
} from './actions';

const initState = {
  name: 'temp'
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        name: action.data
      };
    default:
      return state;
  }
}
