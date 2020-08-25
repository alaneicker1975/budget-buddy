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

function* postNewExpenseGroup({ data }) {
  try {
    const response = yield call(
      fetch,
      `http://localhost:9000/api/expense-groups`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data),
      },
    );

    const { err, expenseGroup } = yield response.json();

    if (err) {
      console.error(err);
      return;
    }

    yield put({
      type: 'SET_NEW_EXPENSE_GROUP',
      expenseGroup,
    });

    yield put({
      type: 'REDIRECT',
      redirectTo: `/expense-group/${expenseGroup._id}`,
    });
  } catch (err) {
    console.log(err);
  }
}

function* updateExpenseGroup({ data }) {
  try {
    const { groupId, ...body } = data;

    const response = yield call(
      fetch,
      `http://localhost:9000/api/expense-groups/${groupId}`,
      {
        method: 'PUT',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(body),
      },
    );

    const { err, expenseGroup } = yield response.json();

    if (err) {
      console.error(err);
      return;
    }

    yield put({
      type: 'UPDATE_SELECTED_EXPENSE_GROUP',
      expenseGroup,
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

function* postNewExpense({ data }) {
  try {
    const { groupId, ...body } = data;

    const response = yield call(
      fetch,
      `http://localhost:9000/api/expense-groups/${groupId}`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(body),
      },
    );

    const { err, expense } = yield response.json();

    if (err) {
      console.error(err);
      return;
    }

    yield put({ type: 'SET_NEW_EXPENSE', expense, groupId });
    yield put({ type: 'SET_SELECTED_EXPENSE_GROUP', groupId });
    yield put({ type: 'TOGGLE_NEW_EXPENSE_FORM', showExpenseNewForm: false });
  } catch (err) {
    console.error(err);
  }
}

function* deleteExpense({ groupId, expenseId }) {
  try {
    const response = yield call(
      fetch,
      `http://localhost:9000/api/expense-groups/${groupId}/${expenseId}`,
      {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      },
    );

    const { err } = yield response.json();

    if (err) {
      console.error(err);
      return;
    }

    yield put({
      type: 'DELETE_EXPENSE_FROM_EXPENSE_GROUP',
      groupId,
      expenseId,
    });

    yield put({ type: 'SET_SELECTED_EXPENSE_GROUP', groupId });
  } catch (err) {
    console.error(err);
  }
}

export default function* watchExpenseGroups() {
  yield takeLatest('FETCH_EXPENSE_GROUPS', fetchExpenseGroups);
  yield takeLatest('INSERT_NEW_EXPENSE', postNewExpense);
  yield takeLatest('INSERT_NEW_EXPENSE_GROUP', postNewExpenseGroup);
  yield takeLatest('UPDATE_EXPENSE_GROUP', updateExpenseGroup);
  yield takeLatest('DELETE_EXPENSE', deleteExpense);
}
