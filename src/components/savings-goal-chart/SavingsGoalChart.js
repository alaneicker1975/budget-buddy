import React from 'react';
import PropTypes from 'prop-types';

const SavingsGoalChart = ({ budgetAmount, budgetEndGoal, unpaidBalance }) => {
  return (
    <div className="savings-goal-chart">
      <div className="flex flex--align-middle flex--space-between">
        <h3 className="text-size-20@medium text-weight-bold">Savings Goal</h3>
        <span>
          ${budgetEndGoal.toLocaleString('en', { minimumFractionDigits: 2 })}
        </span>
      </div>
      <hr />
    </div>
  );
};

SavingsGoalChart.propTypes = {
  budgetAmount: PropTypes.number,
  budgetEndGoal: PropTypes.number,
  unpaidBalance: PropTypes.number,
};

SavingsGoalChart.defaultProps = {
  budgetAmount: 0,
  budgetEndGoal: 0,
  unpaidBalance: 0,
};

export default SavingsGoalChart;
