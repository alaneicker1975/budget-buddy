import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Statistic, Badge } from '@alaneicker/atomik-ui';
import chart from '../../utilities/chart';
import {
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
      <div className="expenses-overview">
        {expenseGroups.map(({ _id, title, expenses, budgetAmount }, i) => {
          const unpaidBalance = calculateUnpaidBalance(expenses);
          const paidBalance = calculatePaidBalance(expenses);

          return (
            <div key={`item-${i}`} className="expenses-overview__item">
              <Card
                title={
                  <div className="expenses-overview__hd">
                    <span>{title}</span>
                    <span className="text-size-16 text-weight-normal">
                      <Badge theme="dark-blue">
                        <span className="text-size-16">
                          Budget{' '}
                          {`$${budgetAmount.toLocaleString('en', {
                            minimumFractionDigits: 2,
                          })}`}
                        </span>
                      </Badge>
                    </span>
                  </div>
                }
              >
                {chart(expenses)}
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
