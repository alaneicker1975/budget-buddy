import expenseReducer from './expenses';
import appReducer from './app';
import actionConfirmDialogReducer from './action-confirm-dialog';

const allReducers = {
  actionConfirmDialog: actionConfirmDialogReducer,
  expenses: expenseReducer,
  app: appReducer,
};

export default allReducers;
