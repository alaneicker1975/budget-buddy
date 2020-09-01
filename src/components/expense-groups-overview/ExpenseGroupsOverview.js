import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Statistic, Button } from '@alaneicker/atomik-ui';
import renderChart from '../../utilities/chart';
import {
  calculateTotalBalance,
  calculateUnpaidBalance,
  calculatePaidBalance,
} from '../../utilities/expense-balances';

const ExpenseGroupsOverview = () => {
  const {
    expenses: { expenseGroups },
  } = useSelector((state) => {
    return state;
  });

  return expenseGroups ? (
    <>
      <h1 className="margin-bottom-24 text-weight-semibold text-size-30">
        Expenses at a Glance
      </h1>
      <div className="margin-bottom-28">
        <hr />
      </div>
      <div className="expenses-overview">
        {expenseGroups.map(({ _id, title, expenses, budgetAmount }, i) => {
          const totalBalance = calculateTotalBalance(expenses);
          const unpaidBalance = calculateUnpaidBalance(expenses);
          const paidBalance = calculatePaidBalance(expenses);
          const remainingBalance = budgetAmount - totalBalance;

          return (
            <div key={`item-${i}`} className="expenses-overview__item">
              <Card
                title={
                  <div className="expenses-overview__hd">
                    {title}
                    <span className="text-size-16">
                      Total Balance $
                      {remainingBalance.toLocaleString('en', {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                }
              >
                {renderChart(expenses)}
                <div className="expenses-overview__balances">
                  <div>
                    <Statistic
                      value={`$${unpaidBalance.toLocaleString('en', {
                        minimumFractionDigits: 2,
                      })}`}
                      label="Unpaid Balance"
                      theme="red"
                      size="md"
                      topLabel
                    />
                  </div>
                  <div>
                    <Statistic
                      value={`$${paidBalance.toLocaleString('en', {
                        minimumFractionDigits: 2,
                      })}`}
                      label="Paid Balance"
                      theme="green"
                      size="md"
                      topLabel
                    />
                  </div>
                </div>
                <Link
                  to={`/expense-group/${_id}`}
                  className="atomikui-btn atomikui-btn--primary atomikui-btn--block"
                  theme="primary"
                  block
                >
                  view the Group
                </Link>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  ) : null;
};

export default ExpenseGroupsOverview;
