import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ExpenseGroupsPreview = ({ className }) => {
  const dispatch = useDispatch();

  const { expenseGroups, error } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_EXPENSE_GROUPS' });
  }, []);

  if (error) {
    return <div className="padding-8 text-color-red">{error}</div>;
  }

  return (
    <div className="expense-group-preview">
      {JSON.stringify(expenseGroups, null, 2)}
    </div>
  );
};

ExpenseGroupsPreview.propTypes = {};

ExpenseGroupsPreview.defaultProps = {};

export default ExpenseGroupsPreview;
