import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Modal } from '@alaneicker/atomik-ui';
import ExpenseGroupDetail from './components/expense-group-detail';
import SideNav from './components/side-nav';
import Header from './components/header';
import ExpenseGroupForm from './components/expense-group-form';

const App = () => {
  const dispatch = useDispatch();

  const {
    expenses: { expenses, expenseGroups, selectedExpenseId },
    modals: { showExpenseFormModal, showExpenseGroupFormModal },
    error,
  } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_EXPENSE_OPTIONS' });
    dispatch({ type: 'FETCH_EXPENSE_GROUPS' });
  }, []);

  return (
    <main className="layout">
      <div className="layout__header">
        <Header logoText="Budget Buddy" />
      </div>
      {error && (
        <Alert theme="error">
          <h4>
            {error.status}: {error.name}
          </h4>
          <p>{error.message}</p>
        </Alert>
      )}
      <div className="layout__main">
        <div className="layout__sidebar">
          <SideNav data={expenseGroups} selectedExpenseId={selectedExpenseId} />
        </div>
        <div className="layout__content">
          <Route path="/expense-group/:id" component={ExpenseGroupDetail} />
        </div>
      </div>
      <Modal
        disableEscapKey
        disableOverlayclick
        onClose={() => {
          dispatch({ type: 'TOGGLE_EXPENSE_FORM_MODAL' });
        }}
        title="Add New Expense"
        isOpen={showExpenseFormModal}
      >
        <ExpenseGroupForm isNewExpense />
      </Modal>
      <Modal
        disableEscapKey
        disableOverlayclick
        onClose={() => {
          dispatch({ type: 'TOGGLE_EXPENSE_GROUP_FORM_MODAL' });
        }}
        title="Add New Expense Group"
        isOpen={true}
      >
        {JSON.stringify(expenses)}
      </Modal>
    </main>
  );
};

export default App;
