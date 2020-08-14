import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

const BudgetVisualizationChart = ({ expenses, totalBalance }) => {
  const options = {
    labels: expenses.map(({ expense }) => {
      return expense;
    }),
  };

  const series = expenses.map(({ balance }) => {
    return balance;
  });

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
      <div>
        <Chart options={options} type="donut" series={series} />
      </div>
    </div>
  );
};

BudgetVisualizationChart.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      expense: PropTypes.string,
      balance: PropTypes.number,
      isPaid: PropTypes.bool,
    }),
  ),
  totalBalance: PropTypes.number,
};

BudgetVisualizationChart.defaultProps = {
  expenses: [],
  totalBalance: 0,
};

export default BudgetVisualizationChart;
