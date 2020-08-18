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
  const response = yield fetch(
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
    yield put({
      type: 'SET_ERROR',
      error: { status: err.status, name: err.name, message: err.message },
    });
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
}

export default function* watchExpenseGroupChange() {
  yield takeLatest('FETCH_EXPENSE_GROUPS', fetchExpenseGroups);
  yield takeLatest('UPDATE_EXPENSE_GROUP', updateExpenseGroup);
}
