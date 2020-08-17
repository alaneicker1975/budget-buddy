import { all } from 'redux-saga/effects';
import watchExpenseGroupChange from './expense-groups';

export default function* rootSaga() {
  yield all([watchExpenseGroupChange()]);
}
