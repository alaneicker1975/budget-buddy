import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseGroupDetail from './components/expense-group-detail';
import ExpenseGroupsPreview from './components/expense-groups-preview';

const App = () => {
  const dispatch = useDispatch();

  const { expenseGroups, error } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_EXPENSE_GROUPS' });
  }, []);

  // if (error) {
  //   return <div className="padding-8 text-color-red">{error}</div>;
  // }

  return (
    <main className="layout">
      <div className="layout__header">{/* <Feader /> */}</div>
      <div className="layout__main">
        <div className="layout__sidebar"></div>
        <div className="layout__content">
          <Router>
            <Route
              path="/"
              exact
              component={() => {
                return <ExpenseGroupsPreview data={expenseGroups} />;
              }}
            />
            <Route path="/expense-group/:id" component={ExpenseGroupDetail} />
          </Router>
        </div>
      </div>
      <div className="layout__footer">{/* <Footer /> */}</div>
    </main>
  );
};

export default App;
