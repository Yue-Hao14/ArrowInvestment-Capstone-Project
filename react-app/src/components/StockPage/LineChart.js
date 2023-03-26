import { useEffect, useState } from "react"
import { fetchStockIntradayData } from "../../utils/FetchStockData"
import "chart.js/auto";
import { Line } from 'react-chartjs-2';

function LineChart({ ticker }) {
  const [chartData, setChartData] = useState();

  // fetch stock data from AlphaVantage and plot stock data to chartJS
  useEffect(() => {
    async function fetchChartData() {


      const data = await fetchStockIntradayData(ticker.toUpperCase())

      // set x axis labels equal to time
      const labels = Object.keys(data["Time Series (5min)"])

      // set stock prices as data for the line chart
      const pricesArr = Object.values(data["Time Series (5min)"])
      const prices = pricesArr.map(price => (
        parseFloat(price["4. close"])
      ))
      console.log(typeof labels[0])
      console.log(prices)

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
        }]
      })

      console.log(chartData)
    }
    fetchChartData()
  }, [])


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

    }
  }


  return (
    <div className="line-chart-section-container">
      <h1>here comes the fancy line chart</h1>
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

export default LineChart
