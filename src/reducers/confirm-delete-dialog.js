import {
  SHOW_CONFIRM_DELETE_DIALOG,
  HIDE_CONFIRM_DELETE_DIALOG,
} from '../actions';

const initialState = {
  actionType: '',
  isActive: false,
  expenseId: null,
  groupId: null,
  content: null,
};

const confirmDeleteDialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CONFIRM_DELETE_DIALOG:
      return { ...state, content: '', ...action.payload };
    case HIDE_CONFIRM_DELETE_DIALOG:
      return {
        ...state,
        isActive: false,
        groupId: null,
        expenseId: null,
      };
    default:
      return state;
  }
};

export default confirmDeleteDialogReducer;
