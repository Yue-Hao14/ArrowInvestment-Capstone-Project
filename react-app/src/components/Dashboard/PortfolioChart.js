import { useSelector } from 'react-redux'
import { calculatePortfolioShareByTicker, calculateTimePortfolioValue, filterArr, flattenStockFetchResult, sumPortfolioValue } from '../../utils/CalculationFunctions'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { fetchAggStockData } from '../../utils/FetchStockData';
import { useDispatch } from 'react-redux';
import Loading from '../Loading';

function PortfolioChart({ allTransactionsArr }) {
  const [tickersArr, setTickersArr] = useState([]);
  const [sharesArr, setSharesArr] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [multiplier, setMultiplier] = useState(5); // amount of interval; 1 min = 2 price is 1 min away
  const [timeSpan, setTimeSpan] = useState("minute"); // interval between data points
  const [dateDuration, setDateDuration] = useState(0) // duration between to and from dates
  const [value, setValue] = useState(); // current portfolio value
  const [isLoaded, setIsLoaded] = useState(false)


  // calculate # of shares for each stock in the portfolio
  useEffect(() => {
    const transactionsArr = Object.values(allTransactionsArr)
    const tickerShareObj = calculatePortfolioShareByTicker(transactionsArr)
    const tickerShareArr = Object.entries(tickerShareObj)
    setTickersArr(Object.keys(tickerShareObj)) // array of all the tickers in portfolio
    setSharesArr(Object.values(tickerShareObj)) // array of # of shares of each ticker in portfolio
  }, [allTransactionsArr])


  // fetch individual stock data
  // calculate time series portfolio value
  // set chartData
  useEffect(() => {
    async function fetchStockPrices() {
      // labels array contains time series date time,
      // values arr is the corresponding portfolio value of that date time
      // timePriceArr is a collection of each stock price and its time series (obj within this array) before adjusting to the shorted time series in the portfolio
      let labels = [], values = [], timePriceArr = [];
      for (let i = 0; i < tickersArr.length; i++) {
        const ticker = tickersArr[i];
        const data = await fetchAggStockData(ticker, multiplier, timeSpan, dateDuration);
        if (data.results) {
          // set labels array to the shortest time series of stock in the portfolio
          // put datetime of stock price into an array
          let stockTimeSeries = data.results.map(result => new Date(result.t).toLocaleString());
          // compare current stock's datetime with existing one in labels array,
          // if current one is shorter, replace labels array with current one
          if (labels.length === 0 || stockTimeSeries.length < labels.length) {
            labels = stockTimeSeries
          }

          // flatten data to have KWP as time is key and price is value
          const stockTimePriceObj = flattenStockFetchResult(data.results)
          // push individual stock's time/price obj to the portfolio's timePriceArr
          let tickerTimePriceObj = {};
          tickerTimePriceObj[ticker] = stockTimePriceObj
          timePriceArr.push(stockTimePriceObj)
        }
      }

      // filter timePriceArr to exclude pre/post market prices
      const timePriceArrFiltered = filterArr(labels, timePriceArr)

      // calculate portfolio value by multiple # of stock shares by stock price at each time point
      const portfolioTimeValueArr = calculateTimePortfolioValue(sharesArr, timePriceArrFiltered)

      // sum each stock value in the portfolio
      const portfolioValueArr = sumPortfolioValue(portfolioTimeValueArr)
      // console.log("portfolioValueArr", portfolioValueArr)
      // console.log(labels)

      // set value to latest portfolio value
      setValue(portfolioValueArr[portfolioTimeValueArr.length - 1])

      // set chart data
      setChartData({
        labels,
        datasets: [{
          label: "Portfolio Value",
          data: portfolioValueArr,
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

      setIsLoaded(true)
    }

    // call the async function to fetch stock price for each ticker in the portfolio
    // console.log("tickersArr in useEffect", tickersArr)
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
      {isLoaded ?
        <div className="line-chart-section-container">
          <div className="line-chart-price">
            {value ? `$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "No pre or post market trades for this stock"}
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
        :
        <Loading />
      }
    </>
  )
}

export default PortfolioChart
