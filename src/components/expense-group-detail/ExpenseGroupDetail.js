import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Statistic, Button } from '@alaneicker/atomik-ui';
import ExpenseGroupForm from '../expense-group-form';
import BudgetVisualizationChart from '../budget-visualization-chart';

const ExpenseGroupDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    expenses: { selectedExpense },
  } = useSelector((state) => {
    return state;
  });

  const {
    _id,
    budgetAmount,
    budgetEndGoal,
    expenses,
    title,
    startDate,
    endDate,
  } = selectedExpense;

  const unpaidBalance = expenses.reduce((a, b) => {
    return !b.isPaid ? a + b.balance : a;
  }, 0);

  const totalBalance = expenses.reduce((a, b) => {
    return a + b.balance;
  }, 0);

  const remainingBalnace = totalBalance - unpaidBalance;

  useEffect(() => {
    dispatch({ type: 'FETCH_EXPENSE', id });
  }, [id]);

  return selectedExpense ? (
    <div className="expense-group-detail">
      <div className="expense-group-detail__hd">
        <div className="text-align-center text-align-left@medium">
          <Statistic
            value={title}
            label={`${moment(startDate).format('L')} - ${moment(endDate).format(
              'L',
            )}`}
            topLabel
          />
        </div>
        <div className="text-align-center text-align-right@medium">
          <span className="text-size-20@medium">
            <Statistic
              value={`$${budgetAmount.toLocaleString('en', {
                minimumFractionDigits: 2,
              })}`}
              label="Budget Amount"
              theme="green"
              size="md"
              topLabel
            />
          </span>
        </div>
      </div>
      <div className="expense-group-detail__bd">
        <div>
          <div className="flex flex--align-middle flex--space-between">
            <h3 className="text-size-20@medium text-weight-bold">Expenses</h3>
            <Button theme="link" size="md">
              <span className="text-weight-semibold">+ Add Expense</span>
            </Button>
          </div>
          <hr />
          <ExpenseGroupForm expenses={expenses} />
          <hr />
          <h4 className="text-size-20@medium text-weight-medium">
            Unpaid Balance:{' '}
            <span className="text-color-red-100">
              $
              {unpaidBalance.toLocaleString('en', { minimumFractionDigits: 2 })}
            </span>
          </h4>
        </div>
        <div>
          <div className="margin-top-32 margin-collapse@medium" />
          <BudgetVisualizationChart
            expenses={expenses}
            totalBalance={totalBalance}
          />
          <h4 className="margin-top-16 margin-bottom-8 text-weight-bold">
            End of Month Projection
          </h4>
          <p>
            Base on your current budget of $
            {budgetAmount.toLocaleString('en', { minimumFractionDigits: 2 })}{' '}
            and a total balance of $
            {totalBalance.toLocaleString('en', { minimumFractionDigits: 2 })} in
            expenses due, you should have a remaning balance of $
            {totalBalance.toLocaleString('en', { minimumFractionDigits: 2 })} on{' '}
            {moment(endDate).format('L')}.
          </p>
        </div>
      </div>
    </div>
  ) : null;
};

ExpenseGroupDetail.propTypes = {};

ExpenseGroupDetail.defaultProps = {};

export default ExpenseGroupDetail;
