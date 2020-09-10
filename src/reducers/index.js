import expenseReducer from './expensesReducer';
import appReducer from './appReducer';
import messageReducer from './messagingReducer';
import actionConfirmDialogReducer from './actionConfirmDialogReducer';

const allReducers = {
  actionConfirmDialog: actionConfirmDialogReducer,
  expenses: expenseReducer,
  messaging: messageReducer,
  app: appReducer,
};

export default allReducers;
