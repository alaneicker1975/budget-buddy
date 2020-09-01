import React from 'react';
import Chart from 'react-apexcharts';

const renderChart = (expenses) => {
  const chartOptions = {
    labels: expenses.map(({ expense }) => {
      return expense === '' ? 0 : expense;
    }),
  };

  const chartSeries = expenses.map(({ balance }) => {
    return +balance;
  });

  return <Chart type="donut" options={chartOptions} series={chartSeries} />;
};

export default renderChart;
