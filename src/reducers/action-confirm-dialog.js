import {
  SHOW_CONFIRM_DELETE_DIALOG,
  HIDE_CONFIRM_DELETE_DIALOG,
} from '../actions';

const initialState = {
  confirmType: '',
  showConfirmDialog: false,
  confirmOptions: {},
};

const confirmDeleteDialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CONFIRM_DELETE_DIALOG:
      return {
        ...state,
        showConfirmDialog: true,
        ...action.payload,
      };
    case HIDE_CONFIRM_DELETE_DIALOG:
      return {
        ...state,
        showConfirmDialog: false,
        groupId: null,
        expenseId: null,
      };
    default:
      return state;
  }
};

export default confirmDeleteDialogReducer;
