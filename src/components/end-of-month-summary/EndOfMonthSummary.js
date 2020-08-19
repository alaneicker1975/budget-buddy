import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const EndOfMonthSummary = ({
  budgetAmount,
  totalBalance,
  remainingBalance,
  endDate,
}) => {
  const formatNumber = (num) => {
    return num.toLocaleString('en', {
      minimumFractionDigits: 2,
    });
  };

  return (
    <p>
      Base on your current budget of $<b>{formatNumber(budgetAmount)}</b> and a
      total balance of $<b>{formatNumber(totalBalance)}</b> in expenses due, you
      should have a remaning balance of $<b>{formatNumber(remainingBalance)}</b>{' '}
      on {moment(endDate).format('L')}.
    </p>
  );
};

EndOfMonthSummary.propTypes = {
  budgetAmount: PropTypes.number,
  totalBalance: PropTypes.number,
  remainingBalance: PropTypes.number,
  endDate: PropTypes.string,
};

EndOfMonthSummary.defaultProps = {
  budgetAmount: 0,
  totalBalance: 0,
  remainingBalance: 0,
  endDate: '',
};

export default EndOfMonthSummary;
