import { useSelector } from 'react-redux'
import { calculatePortfolioShareByTicker, sumNumSameIndex } from '../../utils/CalculationFunctions'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { fetchAggStockData } from '../../utils/FetchStockData';
import { useDispatch } from 'react-redux';

function PortfolioChart({ allTransactionsArr }) {
  const [tickersArr, setTickersArr] = useState([]);
  const [sharesArr, setSharesArr] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [multiplier, setMultiplier] = useState(5); // amount of interval; 1 min = 2 price is 1 min away
  const [timeSpan, setTimeSpan] = useState("minute"); // interval between data points
  const [dateDuration, setDateDuration] = useState(0) // duration between to and from dates
  const [labels, setLabels] = useState();
  const [value, setValue] = useState(); // current portfolio value

  console.log("allTransactionsArr in PortfolioChart", allTransactionsArr)
  useEffect(() => {
    // calculate # of shares for each stock in the portfolio
    const transactionsArr = Object.values(allTransactionsArr)
    const tickerShareObj = calculatePortfolioShareByTicker(transactionsArr)
    const tickerShareArr = Object.entries(tickerShareObj)
    setTickersArr(Object.keys(tickerShareObj)) // array of all the tickers in portfolio
    setSharesArr(Object.values(tickerShareObj)) // array of # of shares of each ticker in portfolio
    // console.log("-------",tickersArr)
  }, [allTransactionsArr])

  // console.log("tickersArr in portfolioChart outside useEffect", tickersArr)
  useEffect(() => {
    async function fetchStockPrices () {
      let labels = [], values = [];
      for (let i = 0; i < tickersArr.length; i++) {
        const data = await fetchAggStockData(tickersArr[i], multiplier, timeSpan, dateDuration);
        if (data.results) {
          labels = data.results.map(result => new Date(result.t).toLocaleString());
          const prices = data.results.map(result => result.c);
          // add this stock's price over time to portfolio value over time
          if (!values.length) {
            values = prices;
          } else {
            values = sumNumSameIndex(prices, values);
          }
        }
        console.log("values", values)
        setChartData({
          labels, // ['4/24/23 7:00pm', '4/24/23 7:05pm']
          datasets: [{
            label: "Portfolio Value",
            data: values,
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

    }
    // call the async function to fetch stock price for each ticker in the portfolio
    console.log("tickersArr in useEffect", tickersArr)
    if (tickersArr.length > 0) {
      fetchStockPrices();
    }
  }, [multiplier, timeSpan, dateDuration, tickersArr])


  // function to extract the portfolio value where mouse hovers over
  // so we can display it above the chart
  const handleHover = (event, active, chart) => {
    if (active.length > 0) {
      const dataIndex = active[0].index;
      const datasetIndex = active[0].datasetIndex;
      const value = chart.data.datasets[datasetIndex].data[dataIndex];
      setValue(value);
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
    <>
      <div>Hello</div>
      <div className="line-chart-section-container">
        <div className="line-chart-price">
          {value ? `$${Number(value).toFixed(2)}` : "No pre or post market trades for this stock"}
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
    </>
  )
}

export default PortfolioChart
