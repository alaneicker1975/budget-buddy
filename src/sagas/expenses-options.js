import { takeLatest, put, call } from 'redux-saga/effects';
import actionCreators, { GET_EXPENSE_OPTIONS } from '../actions';

const { setRecurringExpenses } = actionCreators;

function* getExpenses() {
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
  yield takeLatest(GET_EXPENSE_OPTIONS, getExpenses);
}
