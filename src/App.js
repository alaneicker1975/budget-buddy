import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseGroupDetail from './components/expense-group-detail';
import SideNav from './components/side-nav';
import Header from './components/header';
import NewExpenseGroup from './components/new-expense-group';

const App = () => {
  const dispatch = useDispatch();

  const {
    expenses: { expenseGroups, selectedExpenseId, showNewExpenseForm },
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
    </main>
  );
};

export default App;
