import { PUSH_MESSAGE, PULL_MESSAGE, RESET_MESSAGES } from '../actions';

const initialState = {
  messages: [],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_MESSAGES:
      return { ...state, messages: [] };
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

export default messageReducer;
