import { useEffect, useState } from "react"
import { fetchStockDailyAdjustedData } from "../../../utils/FetchStockData"
import { Chart } from "chart.js/auto"
import { Line } from 'react-chartjs-2';

function OneYearChart({ ticker }) {
  const [chartData, setChartData] = useState();
  const [price, setPrice] = useState();
  const [stockData, setStockData] = useState({})

  // fetch stock data from AlphaVantage and plot stock data to chartJS
  useEffect(() => {
    async function fetchChartData() {
      const data = await fetchStockDailyAdjustedData(ticker.toUpperCase(), "full")
      setStockData(data)
      // console.log(data)
      if (data["Time Series (Daily)"].length === 0) return

      // set x axis labels
      // get date and time keys from data
      const dateTimes = Object.keys(data["Time Series (Daily)"])
      // slice the latest 251 data point (251 trading days a year in 2022)
      // and reverse them to ascending order
      const slicedDateTimes = dateTimes.slice(0, 251).reverse()
      // console.log(slicedDateTimes, slicedDateTimes)

      // find out how many data point of latest business day available right now
      // so we can slice stock prices accordingly later
      const dataEndIndex = slicedDateTimes.length

      // get stock prices from data and slice it to the same amount of data point as slicedDateTimes
      const pricesArr = Object.values(data["Time Series (Daily)"])
      const prices = pricesArr.map(price => (
        parseFloat(price["4. close"]).toFixed(2)
      ))
      const filteredPrices = prices.slice(0, dataEndIndex).reverse()
      // console.log("filteredPrices", filteredPrices)

      setPrice(filteredPrices[filteredPrices.length - 1])

      setChartData({
        labels: slicedDateTimes,
        datasets: [{
          data: filteredPrices,
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
        }]
      })

      // console.log(chartData)
    }
    fetchChartData()
  }, [ticker])

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
    plugins: {
      legend: false
    },
    scales: {
      y: {
        ticks: {
          display: false
        },
        grid: {
          display: false
        }
      },
      x: {
        ticks: {
          display: false
        },
        grid: {
          display: false
        }
      },
    },
    onHover: (event, activeElements, chart) => {
      handleHover(event, activeElements, chart);
    },
  }

  // show "Loading..." message when we exceeds the allowed # of fetch request in 1 min with AlphaVantage
  if (!stockData["Time Series (Daily)"]) return <div>Loading.....Please refresh in 1 minute</div>

  return (
    <div className="line-chart-section-container">
      <div className="line-chart-price">
        {`$${Number(price).toFixed(2)}`}
      </div>
      <div className="line-chart-container">
        {chartData && (
          <Line
            data={chartData}
            options={options}
          />
        )}
      </div>
    </div>
  )
}

export default OneYearChart
