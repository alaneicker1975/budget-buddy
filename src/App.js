import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@alaneicker/atomik-ui';
import ExpenseGroupDetail from './components/expense-group-detail';
import SideNav from './components/side-nav';
import Header from './components/header';
import ExpenseGroupForm from './components/expense-group-form';
import NewExpenseGroup from './components/new-expense-group';

const App = () => {
  const dispatch = useDispatch();

  const {
    expenses: { expenseGroups, selectedExpenseId },
    modals: { showExpenseFormModal },
  } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_EXPENSE_GROUPS' });
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
    </main>
  );
};

export default App;
