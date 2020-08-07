import { all } from 'redux-saga/effects';
import watchFetchExpenseGroups from './expense-groups';

export default function* rootSaga() {
  yield all([watchFetchExpenseGroups()]);
}
