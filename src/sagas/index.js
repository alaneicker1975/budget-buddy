import { all } from 'redux-saga/effects';
import expenseGroupsSaga from './expenseGroupsSaga';
import expenseOptionsSaga from './expenseOptionsSaga';

export default function* rootSaga() {
  yield all([expenseGroupsSaga(), expenseOptionsSaga()]);
}
