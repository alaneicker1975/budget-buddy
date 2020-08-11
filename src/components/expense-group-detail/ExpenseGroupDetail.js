import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ExpenseGroupDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    expenses: { selectedExpense },
  } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_EXPENSE', id });
  }, [id]);

  return selectedExpense ? (
    <div className="expense-group-detail">
      <h1>{selectedExpense.title}</h1>
    </div>
  ) : null;
};

ExpenseGroupDetail.propTypes = {};

ExpenseGroupDetail.defaultProps = {};

export default ExpenseGroupDetail;
