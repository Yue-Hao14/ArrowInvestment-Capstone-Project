import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from "chart.js/auto"


function WatchlistStockChart({labels, prices}) {
  const chartData = {
    labels,
        datasets: [{
          data: prices,
          backgroundColor: 'none',
          borderColor: '#5AC53B',
          borderWidth: 2,
          pointBorderColor: 'rgba(0, 0, 0, 0)',
          pointBackgroundColor: 'rgba(0, 0, 0, 0)',
          pointHoverBackgroundColor: '#5AC53B',
          pointHoverBorderColor: '#000000',
          pointHoverBorderWidth: 4,
          pointHoverRadius: 6,
          tension: 0.0,
          fill: false
        }],
  }

  // Chart.js options
  const watchlistChartOptions = {
    events: [],
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        reverse: true,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
    },
  };

  return (
      <div className="watchlist-line-chart-container">
        {chartData && (
          <Line
            data={chartData}
            options={watchlistChartOptions}
          />
        )}
      </div>
  )
};
export default WatchlistStockChart
