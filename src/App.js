import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@alaneicker/atomik-ui';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import ExpenseGroupDetail from './components/expense-group-detail';
import SideNav from './components/side-nav';
import Header from './components/header';

const App = () => {
  const dispatch = useDispatch();

  const {
    expenses: { expenseGroups, selectedExpenseId },
    error,
  } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_EXPENSE_GROUPS' });
  }, []);

  return (
    <main className="layout">
      <div className="layout__header">
        <Header
          logo={<Icon icon={faPiggyBank} size="lg" color="white" />}
          logoText="Budget Buddy"
        />
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
      <div className="layout__footer">{/* <Footer /> */}</div>
    </main>
  );
};

export default App;
