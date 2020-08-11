import React from 'react';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ExpenseGroupDetail = () => {
  const { id } = useParams();

  return (
    <div className="expense-group-detail">
      <h1 className="text-size-36">ExpenseGroupDetail</h1>
    </div>
  );
};

ExpenseGroupDetail.propTypes = {};

ExpenseGroupDetail.defaultProps = {};

export default ExpenseGroupDetail;
