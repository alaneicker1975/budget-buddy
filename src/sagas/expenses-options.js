import { takeLatest, put, call } from 'redux-saga/effects';
import actionCreators from '../actions';

const { setRecurringExpenses } = actionCreators;

function* fetchExpenses() {
  try {
    const response = yield call(
      fetch,
      'http://localhost:9000/api/expense-options',
    );
    const { err, data } = yield response.json();

    if (err) {
      console.error(err);
      return;
    }

    yield put(setRecurringExpenses(data));
  } catch (err) {
    console.error(err);
  }
}
export default function* watchExpenses() {
  yield takeLatest('GET_EXPENSE_OPTIONS', fetchExpenses);
}
