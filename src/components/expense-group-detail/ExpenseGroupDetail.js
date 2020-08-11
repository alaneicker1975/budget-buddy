import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
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

  useEffect(() => {
    dispatch({ type: 'FETCH_EXPENSE', id });
  }, [id]);

  return selectedExpense ? (
    <div className="expense-group-detail">
      <div className="expense-group-detail__hd">
        <div>
          <h1 className="text-size-24 text-size-36@medium text-weight-bold">
            {title}
          </h1>
          <h2 className="text-size-20">
            {moment(startDate).format('L')} - {moment(endDate).format('L')}
          </h2>
        </div>
        <div className="text-align-right@medium">
          <h4 className="text-size-20@medium text-weight-bold">
            Budget Amount
          </h4>
          <span className="text-size-20 text-size-30@medium">
            ${budgetAmount.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="expense-group-detail__bd">
        <ExpenseGroupForm expenses={expenses} />
        <div>&nbsp;</div>
      </div>
    </div>
  ) : null;
};

ExpenseGroupDetail.propTypes = {};

ExpenseGroupDetail.defaultProps = {};

export default ExpenseGroupDetail;
