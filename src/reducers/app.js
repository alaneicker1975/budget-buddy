import { REDIRECT } from '../actions';

const initialState = {
  redirectTo: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    // Redirects to specified route
    case REDIRECT:
      return { ...state, redirectTo: action.payload };
    default:
      return state;
  }
};

export default appReducer;
