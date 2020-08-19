import { takeLatest, put } from 'redux-saga/effects';

function* fetchExpenses() {
  const response = yield fetch('http://localhost:9000/api/expenses');

  const { err, data } = yield response.json();

  if (err) {
    yield put({
      type: 'SET_ERROR',
      error: { status: err.status, name: err.name, message: err.message },
    });
  }

  yield put({
    type: 'SET_EXPENSE_OPTIONS',
    data,
  });
}
export default function* watchExpenses() {
  yield takeLatest('FETCH_EXPENSE_OPTIONS', fetchExpenses);
}
