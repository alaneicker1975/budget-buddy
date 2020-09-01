import { PUSH_MESSAGE, PULL_MESSAGE, REDIRECT } from '../actions';

const initialState = {
  redirectTo: null,
  messages: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    // Redirects to specified route
    case REDIRECT:
      return { ...state, redirectTo: action.payload };
    case PUSH_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case PULL_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((message) => {
          return message.id !== action.payload.id;
        }),
      };
    default:
      return state;
  }
};

export default appReducer;
