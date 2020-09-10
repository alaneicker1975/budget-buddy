import expenseReducer from './expensesReducer';
import appReducer from './appReducer';
import messageReducer from './messageReducer';
import confirmDialogReducer from './confirmDeleteDialogReducer';

const allReducers = {
  confirmDeleteDialog: confirmDialogReducer,
  expenses: expenseReducer,
  messages: messageReducer,
  app: appReducer,
};

export default allReducers;
