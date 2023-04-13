import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { fetchAggStockData } from '../../utils/FetchStockData';

function StockChart({ getLatestPriceCallBack }) {
  // state for storing parameters for fetching stock data
  const [chartData, setChartData] = useState(null);
  const [multiplier, setMultiplier] = useState(5); // amount of interval; 1 min = 2 price is 1 min away
  const [timeSpan, setTimeSpan] = useState("minute"); // interval between data points
  const [dateDuration, setDateDuration] = useState(0) // duration between to and from dates

  const [price, setPrice] = useState(); // state for showing the price above chart whereever mouse hovers over
  const [latestPrice, setLatestPrice] = useState(); // state to pass back to parent component (stockPage) to have latest price for stock buy/sell

  // pass latestPrice back to stockPage
  getLatestPriceCallBack(latestPrice)

  // Get the stock ticker from the URL params
  let { ticker } = useParams();
  ticker = ticker.toUpperCase();

  // Fetch stock data from polygon for graph
  useEffect(() => {
    async function fetchChartData() {
      const data = await fetchAggStockData(ticker, multiplier, timeSpan, dateDuration);
      // console.log("data in StockChart",data)
      let labels, prices;
      if (data.results) {
        labels = data.results.map(result => new Date(result.t).toLocaleString());
        prices = data.results.map(result => result.c);
        setPrice(prices[prices.length - 1]) // set default price to latest stock price
        setLatestPrice(prices[prices.length - 1])
      }

      setChartData({
        labels,
        datasets: [{
          label: "Stock Price",
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
  }, [ticker, multiplier, timeSpan, dateDuration]);

  // function to extract the stock price where mouse hovers over
  // so we can display it above the chart
  const handleHover = (event, active, chart) => {
    if (active.length > 0) {
      const dataIndex = active[0].index;
      const datasetIndex = active[0].datasetIndex;
      const value = chart.data.datasets[datasetIndex].data[dataIndex];
      setPrice(value);
    }
  };

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawOnChartArea: false
        },
        ticks: {
          display: false
        },
      },
      y: {
        grid: {
          display: false,
          drawOnChartArea: false
        },
        ticks: {
          display: false
        },
      }
    },
    plugins: {
      legend: false,
    },
    onHover: (event, activeElements, chart) => {
      handleHover(event, activeElements, chart);
    },
  };

  // object to store different paramters to pass in fetch request based on different charts
  const chartParameters = {
    "oneDay": {
      multiplier: 5,
      timeSpan: "minute",
      dateDuration: 0,
    },
    "oneWeek": {
      multiplier: 10,
      timeSpan: "minute",
      dateDuration: 6,
    },
    "oneMonth": {
      multiplier: 1,
      timeSpan: "hour",
      dateDuration: 30,
    },
    "threeMonth": {
      multiplier: 1,
      timeSpan: "day",
      dateDuration: 90,
    },
    "oneYear": {
      multiplier: 1,
      timeSpan: "day",
      dateDuration: 365,
    },
    "fiveYear": {
      multiplier: 1,
      timeSpan: "week",
      dateDuration: 365 * 5,
    },
  }

  // based on which graph is clicked set correct parameters to pass in fetch request
  const handleClick = (e) => {
    e.preventDefault();

    const parameters = chartParameters[e.target.value]
    setMultiplier(parameters.multiplier)
    setTimeSpan(parameters.timeSpan)
    setDateDuration(parameters.dateDuration)
  }

  return (
    <div className="line-chart-section-container">
      <div className="line-chart-price">
        {price ? `$${Number(price).toFixed(2)}` : "No pre or post market trades for this stock"}
      </div>
      <div className="line-chart-container">
        {chartData && (
          <Line
            data={chartData}
            options={options}
          />
        )}
      </div>
      <div className='stock-page-line-chart-navbar-container'>
        {/* Display buttons to change the range of data */}
          <button className="stock-page-line-chart-button" value='oneDay' onClick={handleClick}>1D</button>
          <button className="stock-page-line-chart-button" value='oneWeek' onClick={handleClick}>1W</button>
          <button className="stock-page-line-chart-button" value='oneMonth' onClick={handleClick}>1M</button>
          <button className="stock-page-line-chart-button" value='threeMonth' onClick={handleClick}>3M</button>
          <button className="stock-page-line-chart-button" value='oneYear' onClick={handleClick}>1Y</button>
          <button className="stock-page-line-chart-button" value='fiveYear' onClick={handleClick}>5Y</button>

      </div>
    </div>
  )
}

export default StockChart
