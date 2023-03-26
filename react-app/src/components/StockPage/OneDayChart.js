import { useEffect, useState } from "react"
import { fetchStockIntradayData } from "../../utils/FetchStockData"
import { Chart } from "chart.js/auto"
import { Line } from 'react-chartjs-2';

function OneDayChart({ ticker }) {
  const [chartData, setChartData] = useState();
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday
  const daysToSubtract = dayOfWeek === 0 ? 2
    : dayOfWeek === 6 ? 1 : 0; // if Sun, substract 2 days, if Sat, substract 1 day
  const previousDate = new Date(today.getTime() - daysToSubtract * 24 * 60 * 60 * 1000); // latest business day
  const year = previousDate.getFullYear();
  const month = (previousDate.getMonth() + 1).toString().padStart(2, '0');
  const day = previousDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  console.log("previousDate", previousDate)

  // fetch stock data from AlphaVantage and plot stock data to chartJS
  useEffect(() => {
    async function fetchChartData() {
      const data = await fetchStockIntradayData(ticker.toUpperCase())

      // set x axis labels equal to today's date and time
      // get date and time keys from data
      const dateTimes = Object.keys(data["Time Series (5min)"]).reverse()
      // need to filter to get only latest business day's (today or Fri) dateTimes
      let filteredDateTimes = []
      dateTimes.forEach(label => {
        if (label.slice(0, 10) === formattedDate) {
          return filteredDateTimes.push(label)
        }
      })
      // find out how many data point of latest business day available right now
      // so we can slice stock prices accordingly later
      const dataEndIndex = filteredDateTimes.length
      console.log("trim the date portion of label", dateTimes[0], dateTimes[0].length, dateTimes[0].slice(0, 10))
      console.log("DateTime", dateTimes)
      console.log("filteredDateTime", filteredDateTimes)

      // get stock prices from data and slice it to the same amount of data point as filteredDateTimes
      const pricesArr = Object.values(data["Time Series (5min)"])
      const prices = pricesArr.map(price => (
        parseFloat(price["4. close"]).toFixed(2)
      )).reverse()
      const filteredPrices = prices.slice(0, dataEndIndex)
      // console.log(typeof DateTime[0])
      // console.log(prices)

      setChartData({
        labels: filteredDateTimes,
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

export default OneDayChart
