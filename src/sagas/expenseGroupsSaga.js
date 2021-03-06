import { takeLatest, put, call } from 'redux-saga/effects';
import actionCreators, {
  GET_EXPENSE_GROUPS,
  DELETE_EXPENSE,
  DELETE_EXPENSE_GROUP,
  UPDATE_EXPENSE_GROUP,
  INSERT_NEW_EXPENSE,
  INSERT_NEW_EXPENSE_GROUP,
} from '../actions';

const {
  redirect,
  toggleNewExpenseForm,
  setExpenseGroups,
  setNewExpense,
  updateExpenseGroups,
  removeExpenseGroup,
  removeExpenseFromExpenseGroup,
  setSelectedExpenseGroup,
  setNewExpenseGroup,
  updateSelectedExpenseGroup,
} = actionCreators;

function* getExpenseGroups() {
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

function* insertNewExpenseGroup({ payload }) {
  try {
    const response = yield call(
      fetch,
      `http://localhost:9000/api/expense-groups`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(payload),
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

function* updateExpenseGroup({ payload }) {
  try {
    const { groupId, expenseId, ...body } = payload;

    const response = yield call(
      fetch,
      `http://localhost:9000/api/expense-groups/${groupId}`,
      {
        method: 'PUT',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ expenseId, ...body }),
      },
    );

    const { err, expenseGroup } = yield response.json();

    if (err) {
      console.error(err);
      return;
    }

    yield put(updateSelectedExpenseGroup({ expenseGroup }));
    yield put(updateExpenseGroups({ groupId }));
  } catch (err) {
    console.error(err);
  }
}

function* insertNewExpense({ payload }) {
  try {
    const { groupId, ...body } = payload;

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

function* deleteExpense({ payload }) {
  try {
    const { groupId, expenseId } = payload;

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

    yield put(removeExpenseFromExpenseGroup({ groupId, expenseId }));
    yield put(setSelectedExpenseGroup({ groupId }));
  } catch (err) {
    console.error(err);
  }
}

function* deleteExpenseGroup({ payload }) {
  const { groupId } = payload;

  const response = yield call(
    fetch,
    `http://localhost:9000/api/expense-groups/${groupId}`,
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

  yield put(removeExpenseGroup({ groupId }));
  yield put(setSelectedExpenseGroup({ groupId: null }));
}

export default function* expenseGroupsSaga() {
  yield takeLatest(GET_EXPENSE_GROUPS, getExpenseGroups);
  yield takeLatest(INSERT_NEW_EXPENSE, insertNewExpense);
  yield takeLatest(INSERT_NEW_EXPENSE_GROUP, insertNewExpenseGroup);
  yield takeLatest(UPDATE_EXPENSE_GROUP, updateExpenseGroup);
  yield takeLatest(DELETE_EXPENSE, deleteExpense);
  yield takeLatest(DELETE_EXPENSE_GROUP, deleteExpenseGroup);
}
