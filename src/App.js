import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseGroupDetail from './components/expense-group-detail';
import SideNav from './components/side-nav';
import Header from './components/header';
import NewExpenseGroup from './components/new-expense-group';
import ConfirmDelete from './components/confirm-delete';
import actionCreators from './actions';

const {
  deleteExpense,
  deleteExpenseGroup,
  hideConfirmDeleteDialog,
} = actionCreators;

const App = () => {
  const dispatch = useDispatch();

  const {
    confirmDeleteDialog,
    expenses: { expenseGroups, selectedExpenseId },
  } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch({ type: 'GET_EXPENSE_GROUPS' });
  }, []);

  return (
    <main className="layout">
      <div className="layout__header">
        <Header logoText="Budget Buddy" />
      </div>
      <div className="layout__main">
        <div className="layout__sidebar">
          <SideNav data={expenseGroups} selectedExpenseId={selectedExpenseId} />
        </div>
        <div className="layout__content">
          <Route path="/new-expense-group" component={NewExpenseGroup} />
          <Route path="/expense-group/:id" component={ExpenseGroupDetail} />
        </div>
      </div>
      <ConfirmDelete
        isActive={confirmDeleteDialog.isActive}
        onConfirm={() => {
          const { actionType } = confirmDeleteDialog;
          if (actionType === 'deleteGroup') {
            dispatch(
              deleteExpenseGroup({
                groupId: confirmDeleteDialog.groupId,
              }),
            );
          }
          if (actionType === 'deleteExpense') {
            dispatch(
              deleteExpense({
                groupId: confirmDeleteDialog.groupId,
                expenseId: confirmDeleteDialog.expenseId,
              }),
            );
          }
          return dispatch(hideConfirmDeleteDialog());
        }}
        onCancel={() => {
          return dispatch(hideConfirmDeleteDialog());
        }}
      >
        {confirmDeleteDialog.actionType === 'deleteGroup' && 'Group:'}{' '}
        {confirmDeleteDialog.content}
      </ConfirmDelete>
    </main>
  );
};

export default App;
