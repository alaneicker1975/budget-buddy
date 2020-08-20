import { takeLatest, put, call } from 'redux-saga/effects';

function* fetchExpenses() {
  try {
    const response = yield call(fetch, 'http://localhost:9000/api/expenses');
    const { err, data } = yield response.json();

    if (err) {
      console.error(err);
      return;
    }

    yield put({
      type: 'SET_EXPENSE_OPTIONS',
      data,
    });
  } catch (err) {
    console.error(err);
  }
}
export default function* watchExpenses() {
  yield takeLatest('FETCH_EXPENSE_OPTIONS', fetchExpenses);
}
