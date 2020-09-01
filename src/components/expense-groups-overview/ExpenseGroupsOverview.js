import React from 'react';
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import { Card } from '@alaneicker/atomik-ui';
import renderChart from '../../utilities/chart';

const ExpenseGroupsOverview = () => {
  const {
    expenses: { expenseGroups },
  } = useSelector((state) => {
    return state;
  });

  return expenseGroups ? (
    <>
      <h1 className="margin-bottom-24 text-weight-semibold text-size-30">
        Expense Groups at a Glance
      </h1>
      <div className="margin-bottom-28">
        <hr />
      </div>
      <div className="expenses-overview">
        {expenseGroups.map(({ title, expenses }, i) => {
          return (
            <div key={`item-${i}`} className="expenses-overview__item">
              <Card title={<div className="text-align-center">{title}</div>}>
                {renderChart(expenses)}
              </Card>
            </div>
          );
        })}
      </div>
    </>
  ) : null;
};

export default ExpenseGroupsOverview;
