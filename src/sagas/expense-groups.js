import { takeLatest, put, call } from 'redux-saga/effects';
import actionCreators from '../actions';

const {
  redirect,
  toggleNewExpenseForm,
  setExpenseGroups,
  setNewExpense,
  updateExpenseGroups,
  deleteExpenseFromExpenseGroup,
  setSelectedExpenseGroup,
  setNewExpenseGroup,
  updateSelectedExpenseGroup,
} = actionCreators;

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

    yield put(setExpenseGroups(data));
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

    yield put(setNewExpenseGroup({ expenseGroup }));

    yield put(redirect(`/expense-group/${expenseGroup._id}`));
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

    yield put(updateSelectedExpenseGroup({ expenseGroup }));

    yield put(
      updateExpenseGroups({ groupId: data.groupId, expenseId: data.expenseId }),
    );
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

    yield put(setNewExpense({ expense, groupId }));
    yield put(setSelectedExpenseGroup({ groupId }));
    yield put(toggleNewExpenseForm(false));
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

    yield put(deleteExpenseFromExpenseGroup({ groupId, expenseId }));

    yield put(setSelectedExpenseGroup({ groupId }));
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
