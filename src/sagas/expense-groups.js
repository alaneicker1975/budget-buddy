import { takeLatest, put, call } from 'redux-saga/effects';

function* fetchExpenseGroups() {
  try {
    const response = yield call(
      fetch,
      'http://localhost:9000/api/expense-groups',
    );

    const { err, data } = yield response.json();

    if (err) {
      console.error(err);
      return;
    }

    yield put({
      type: 'SET_EXPENSE_GROUPS',
      data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* updateExpenseGroup({ data }) {
  try {
    const response = yield call(
      fetch,
      `http://localhost:9000/api/expense-groups/${data.groupId}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
      },
    );

    const { err } = yield response.json();

    if (err) {
      console.error(err);
      return;
    }

    yield put({
      type: 'UPDATE_SELECTED_EXPENSE',
      data,
    });

    yield put({
      type: 'UPDATE_EXPENSE_GROUPS',
      groupId: data.groupId,
      expenseId: data.expenseId,
    });
  } catch (err) {
    console.error(err);
  }
}

export default function* watchExpenseGroups() {
  yield takeLatest('FETCH_EXPENSE_GROUPS', fetchExpenseGroups);
  yield takeLatest('UPDATE_EXPENSE_GROUP', updateExpenseGroup);
}
