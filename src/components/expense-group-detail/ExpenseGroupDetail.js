import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Chart from 'react-apexcharts';
import { Button, FormField } from '@alaneicker/atomik-ui';
import ExpenseForm from '../expense-form';
import EndOfMonthSummary from '../end-of-month-summary';

const ExpenseGroupDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const newExpenseForm = useRef();
  const [contentHeight, setContentHeight] = useState('0px');

  const {
    expenses: { selectedExpense, showNewExpenseForm },
  } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch({ type: 'SET_SELECTED_EXPENSE_GROUP', groupId: id });
  }, [id]);

  useEffect(() => {
    if (selectedExpense) {
      setContentHeight(`${newExpenseForm.current.scrollHeight}px`);
    }
  }, [selectedExpense]);

  useEffect(() => {
    dispatch({ type: 'TOGGLE_NEW_EXPENSE_FORM', showNewExpenseForm: false });
    dispatch({ type: 'REDIRECT', redirectTo: null });
  }, []);

  if (selectedExpense) {
    const {
      _id,
      budgetAmount,
      expenses,
      title,
      startDate,
      endDate,
    } = selectedExpense;

    const totalBalance = expenses.reduce((a, b) => {
      return a + +b.balance;
    }, 0);

    const unpaidBalance = expenses.reduce((a, b) => {
      return !b.isPaid ? a + +b.balance : a;
    }, 0);

    const remainingBalance = budgetAmount - totalBalance;

    const chartOptions = {
      labels: expenses.map(({ expense }) => {
        return expense === '' ? 0 : expense;
      }),
    };

    const chartSeries = expenses.map(({ balance }) => {
      return +balance;
    });

    return (
      <div className="expense-group-detail">
        <div className="expense-group-detail__hd">
          <div className="text-align-center text-align-left@large">
            <FormField
              className="expense-group-detail__date"
              value={`${moment(startDate).format('L')} - ${moment(
                endDate,
              ).format('L')}`}
            />
            <FormField
              className="expense-group-detail__title text-align-center text-align-left@large"
              value={title}
            />
          </div>
          <div className="text-align-center text-align-right@large">
            <span className="text-size-20@large">
              <FormField
                label="Budget Amount"
                className="expense-group-detail__budget-amount text-align-center text-align-right@large"
                value={budgetAmount}
              />
            </span>
          </div>
        </div>
        <div className="expense-group-detail__bd">
          <div>
            <div className="flex flex--align-middle flex--space-between">
              <h3 className="text-size-20 text-weight-semibold">Expenses</h3>
              <Button
                theme="link"
                size="md"
                onClick={() => {
                  return dispatch({
                    type: 'TOGGLE_NEW_EXPENSE_FORM',
                    showNewExpenseForm: true,
                  });
                }}
              >
                <span className="text-weight-semibold">+ Add Expense</span>
              </Button>
            </div>
            <div
              ref={newExpenseForm}
              className="expense-group-detail__new-expense-form"
              style={{ height: showNewExpenseForm ? contentHeight : '0px' }}
            >
              <ExpenseForm groupId={_id} isNewExpense />
            </div>
            <hr />
            <ExpenseForm expenses={expenses} groupId={_id} />
            <hr />
            <h4 className="text-size-20@large text-weight-medium">
              Unpaid Balance:{' '}
              <span className="text-color-red-100">
                $
                {unpaidBalance.toLocaleString('en', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </h4>
          </div>
          <div>
            <div className="margin-top-32 margin-collapse@large" />
            <div className="savings-goal-chart">
              <div className="flex flex--align-middle flex--space-between">
                <h3 className="text-size-20@large text-weight-semibold">
                  Budget Visualization
                </h3>
                <span>
                  <span className="text-weight-semibold">Expenses Total:</span>{' '}
                  $
                  {totalBalance.toLocaleString('en', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <hr />
              <div>
                <Chart
                  type="donut"
                  options={chartOptions}
                  series={chartSeries}
                />
              </div>
            </div>

            <h4 className="margin-top-16 margin-bottom-8 text-weight-semibold">
              End of Month Projection
            </h4>
            <EndOfMonthSummary
              budgetAmount={budgetAmount}
              totalBalance={totalBalance}
              remainingBalance={remainingBalance}
              endDate={endDate}
            />
          </div>
        </div>
      </div>
    );
  }
  return <div>No expenses to display.</div>;
};

export default ExpenseGroupDetail;
