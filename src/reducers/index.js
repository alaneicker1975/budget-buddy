import expenseReducer from './expenses';
import appReducer from './app';
import messageReducer from './messaging';
import actionConfirmDialogReducer from './action-confirm-dialog';

const allReducers = {
  actionConfirmDialog: actionConfirmDialogReducer,
  expenses: expenseReducer,
  messaging: messageReducer,
  app: appReducer,
};

export default allReducers;
