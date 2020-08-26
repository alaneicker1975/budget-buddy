import expenseReducer from './expenses';
import appReducer from './app';

const allReducers = {
  expenses: expenseReducer,
  app: appReducer,
};

export default allReducers;
