import React from 'react';
import PropTypes from 'prop-types';

const BudgetVisualizationChart = ({ expenses, totalBalance }) => {
  return (
    <div className="savings-goal-chart">
      <div className="flex flex--align-middle flex--space-between">
        <h3 className="text-size-20@medium text-weight-bold">
          Budget Visualization
        </h3>
        <span>
          <span className="text-weight-semibold">Expenses Total:</span> $
          {totalBalance.toLocaleString('en', { minimumFractionDigits: 2 })}
        </span>
      </div>
      <hr />
    </div>
  );
};

BudgetVisualizationChart.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.number),
  totalBalance: PropTypes.number,
};

BudgetVisualizationChart.defaultProps = {
  expenses: [],
  totalBalance: 0,
};

export default BudgetVisualizationChart;
