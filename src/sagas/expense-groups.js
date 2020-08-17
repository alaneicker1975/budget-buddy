import { takeLatest, put } from 'redux-saga/effects';

function* fetchExpenseGroups() {
  const response = yield fetch('http://localhost:9000/api/expense-groups');

  const { err, data } = yield response.json();

  if (err) {
    yield put({
      type: 'SET_ERROR',
      error: { status: err.status, name: err.name, message: err.message },
    });
  }

  yield put({
    type: 'FETCH_EXPENSE_GROUP_SUCCESS',
    data,
  });
}

function* updateExpenseGroup({ data }) {
  // Do fetch to PUT updated data

  yield put({
    type: 'UPDATE_EXPENSE_GROUP_SUCCESS',
    data,
  });
}

export default function* watchExpenseGroupChange() {
  yield takeLatest('FETCH_EXPENSE_GROUPS', fetchExpenseGroups);
  yield takeLatest('UPDATE_EXPENSE_GROUP', updateExpenseGroup);
}
