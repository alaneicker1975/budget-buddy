import { all } from 'redux-saga/effects';
import watchExpenseGroups from './expense-groups';
import watchExpensesOptions from './expenses-options';

export default function* rootSaga() {
  yield all([watchExpenseGroups(), watchExpensesOptions()]);
}
