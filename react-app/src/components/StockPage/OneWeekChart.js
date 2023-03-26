import { useEffect, useState } from "react"
import { fetchStockIntradayData } from "../../utils/FetchStockData"
import { Chart } from "chart.js/auto"
import { Line } from 'react-chartjs-2';

function OneWeekChart({ ticker }) {
  const [chartData, setChartData] = useState();
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysToSubtract = dayOfWeek === 0 ? 2
                              : dayOfWeek === 1 ? 3 : 1;
  const previousDate = new Date(today.getTime() - daysToSubtract * 24 * 60 * 60 * 1000);
  const year = previousDate.getFullYear();
  const month = (previousDate.getMonth() + 1).toString().padStart(2, '0');
  const day = previousDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  console.log("formattedDate",typeof formattedDate)

  // fetch stock data from AlphaVantage and plot stock data to chartJS
  useEffect(() => {
    async function fetchChartData() {
      const data = await fetchStockIntradayData(ticker.toUpperCase(),'15min', 'full')

      // set x axis labels equal to time
      const labels = Object.keys(data["Time Series (15min)"])

      // get stock prices of current day from data
      const pricesArr = Object.values(data["Time Series (15min)"])
      const prices = pricesArr.map(price => (
        parseFloat(price["4. close"]).toFixed(2)
      ))
      // console.log(typeof labels[0])
      // console.log(prices)

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

export default OneWeekChart
