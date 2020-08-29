import {
  SHOW_CONFIRM_DELETE_DIALOG,
  HIDE_CONFIRM_DELETE_DIALOG,
} from '../actions';

const initialState = {
  isActive: false,
  expenseId: null,
  groupId: null,
  expense: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CONFIRM_DELETE_DIALOG:
      return { ...state };
    case HIDE_CONFIRM_DELETE_DIALOG:
      return { ...state };
    default:
      return state;
  }
};

export default appReducer;
