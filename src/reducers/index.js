import expenseReducer from './expenses';
import appReducer from './app';
import confirmDeleteDialogReducer from './confirm-delete-dialog';

const allReducers = {
  confirmDeleteDialog: confirmDeleteDialogReducer,
  expenses: expenseReducer,
  app: appReducer,
};

export default allReducers;
