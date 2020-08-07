import { takeLatest, put } from 'redux-saga/effects';

function* fetchExpenseGroups() {
  try {
    const response = yield fetch(
      'http://localhost:9000/api/api/expense-groups',
    );

    const { err, data } = yield response.json();

    if (err) {
      throw new Error(err);
    }

    yield put({
      type: 'FETCH_EXPENSE_GROUP_SUCCESS',
      data,
    });
  } catch ({ statusCode, name, message }) {
    yield put({ type: 'FETCH_ERROR', error: { statusCode, name, message } });
  }
}

export default function* watchFetchExpenseGroups() {
  yield takeLatest('FETCH_EXPENSE_GROUPS', fetchExpenseGroups);
}
