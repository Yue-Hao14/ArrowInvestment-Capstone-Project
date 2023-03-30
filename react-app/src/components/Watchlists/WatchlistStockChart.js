import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from "chart.js/auto"
import { fetchAggStockData } from '../../utils/FetchStockData';

function WatchlistStockChart({ticker}) {
  const [chartData, setChartData] = useState(null);

  // Fetch stock data from polygon for graph
  useEffect(() => {
    async function fetchChartData() {
      const data = await fetchAggStockData(ticker, 5, "minute", 0);
      console.log(data)
      const labels = data.results.map(result => new Date(result.t).toLocaleString());
      const prices = data.results.map(result => result.c);

      setChartData({
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
      });
    }
    fetchChartData();
  }, [ticker]);

  // Chart.js options
  const options = {
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
            options={options}
          />
        )}
      </div>
  )
};
export default WatchlistStockChart
