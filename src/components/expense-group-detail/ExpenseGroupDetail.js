import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Statistic } from '@alaneicker/atomik-ui';
import ExpenseGroupForm from '../expense-group-form';

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
              value={`$${budgetAmount.toLocaleString()}`}
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
          <ExpenseGroupForm expenses={expenses} />
          <hr />
          <h4 className="text-size-20@medium text-weight-bold">
            Total Unpaid Balance:{' '}
            <span className="text-color-red-100">${unpaidBalance}</span>
          </h4>
        </div>
        <div>&nbsp;</div>
      </div>
    </div>
  ) : null;
};

ExpenseGroupDetail.propTypes = {};

ExpenseGroupDetail.defaultProps = {};

export default ExpenseGroupDetail;
