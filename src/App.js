import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@alaneicker/atomik-ui';
import ExpenseGroupsOverview from './components/expense-groups-overview';
import ExpenseGroupDetail from './components/expense-group-detail';
import SideNav from './components/side-nav';
import Header from './components/header';
import NewExpenseGroup from './components/new-expense-group';
import ConfirmDelete from './components/confirm-delete';
import actionCreators from './actions';

const {
  getExpenseGroups,
  resetSelectedExpenseGroupId,
  deleteExpense,
  deleteExpenseGroup,
  hideConfirmDeleteDialog,
  pushMessage,
  resetMessages,
} = actionCreators;

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  history.listen(({ pathname }) => {
    if (pathname !== '/') {
      dispatch(resetMessages());
    } else {
      dispatch(resetSelectedExpenseGroupId({ selectedExpenseGroupId: null }));
    }
  });

  const {
    expenses: { expenseGroups, selectedExpenseGroupId },
    messages: { messages },
    confirmDeleteDialog: { confirmType, showConfirmDialog, confirmOptions },
  } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch(resetMessages());
    dispatch(getExpenseGroups());
  }, []);

  return (
    <main className="layout">
      <div className="layout__header">
        <Header logoText="Budget Buddy" />
      </div>
      <div className="layout__main">
        <div className="layout__sidebar">
          <SideNav
            data={expenseGroups}
            selectedExpenseGroupId={selectedExpenseGroupId}
          />
        </div>
        <div className="layout__content">
          {messages.map(({ id, type, message }, i) => {
            return (
              <Alert
                key={`alert-${i}`}
                className="margin-bottom-8"
                theme={type}
                onClose={() => {}}
              >
                {message}
              </Alert>
            );
          })}
          <Route path="/" exact component={ExpenseGroupsOverview} />
          <Route path="/new-expense-group" component={NewExpenseGroup} />
          <Route path="/expense-group/:id" component={ExpenseGroupDetail} />
        </div>
      </div>
      <ConfirmDelete
        isActive={showConfirmDialog}
        onConfirm={() => {
          if (confirmType === 'deleteGroup') {
            dispatch(
              deleteExpenseGroup({
                groupId: confirmOptions.groupId,
              }),
            );
            dispatch(
              pushMessage({
                is: 'groupDelete',
                type: 'success',
                message: 'Expense group deleted',
              }),
            );
            history.push('/');
          }
          if (confirmType === 'deleteExpense') {
            dispatch(
              deleteExpense({
                groupId: confirmOptions.groupId,
                expenseId: confirmOptions.expenseId,
              }),
            );
          }
          return dispatch(hideConfirmDeleteDialog());
        }}
        onCancel={() => {
          return dispatch(hideConfirmDeleteDialog());
        }}
      >
        {confirmType === 'deleteGroup' && 'Group:'} {confirmOptions.content}
      </ConfirmDelete>
    </main>
  );
};

export default App;
