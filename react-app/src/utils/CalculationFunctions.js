// calculate portfolio's buying power based on all the cash transfers
export const calculateBuyingPower = (transfersArr, allTransactionsArr = []) => {
  let buyingPower = 0;
  // add cash deposit/withdraw to buying power
  for (const transfer of transfersArr) {
    buyingPower += transfer.amount
  }
  // add stock buy/sell to buying power
  if (allTransactionsArr.length > 0) {
    for (const transaction of allTransactionsArr) {
      buyingPower += (transaction.quantity * transaction.settled_price) * -1
    }
  }
  return buyingPower
}
// .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })


// calculate # of existing shares of a ticker
export const calculateExistingShares = (transactionsArr) => {
  let shares = 0;
  for (const transaction of transactionsArr) {
    shares += transaction.quantity
  }
  return shares
}


// calculate # of share for each ticker in the portfolio and
// return an object {ticker: # of shares}
export const calculatePortfolioShareByTicker = (transactionsArr) => {
  let tickerShareObj = {}
  transactionsArr.forEach(transaction => {
    // if there is transactions, put ticker-quantity as KVP into an object
    // if there is no transactions, then return an empty obj
    if (tickerShareObj[transaction.stock_ticker]) {
      tickerShareObj[transaction.stock_ticker] += transaction.quantity
    } else {
      tickerShareObj[transaction.stock_ticker] = transaction.quantity
    }
  });

  // remove 0 share stock from tickerShareObj
  for (let key of Object.keys(tickerShareObj)) {
    if (tickerShareObj[key] === 0) delete tickerShareObj[key];
  }
  return tickerShareObj
}


// sum numbers in array1 and array2 with same index
export const sumNumSameIndex = (arr1, arr2) => {
  let sumArr = [];
  for (let index = 0; index < arr1.length; index++) {
    const numArr1 = arr1[index];
    const numArr2 = arr2[index];
    if (numArr1, numArr2) {
      const sumNum = numArr1 + numArr2
      sumArr.push(sumNum)
    }
  }
  return sumArr;
}


// get a random integer between two values, inclusive
export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}


// flatten stock's fetch result from Polygon Aggregates (Bars) for portfolio value calculation
export const flattenStockFetchResult = (resultsArr) => {
  const flattenedResultObj = {};
  resultsArr.forEach(result => {
    const time = new Date(result.t).toLocaleString();
    const price = result.c;
    flattenedResultObj[time] = price;
  })
  return flattenedResultObj;
}

// filter timePriceArr to keep time/price pair where time/price exists for all stocks in the portfolio
// by compare it to the benchmarkArr where hosts the least available time points based on stocks in the portfolio
export const filterArr = (benchmarkArr, unfilteredTimePriceArr) => {
  let filteredArr = [];
  // loop through each stock's time/price pair
  unfilteredTimePriceArr.forEach(timePriceObj => {
    let tickerTimePriceObj = {};
    // only keep the time/price pair where time exists in bechmarkArr
    benchmarkArr.forEach(time => {
      if (timePriceObj[time]) {
        tickerTimePriceObj[time] = timePriceObj[time]
      }
    })
    filteredArr.push(tickerTimePriceObj)
  })
  return filteredArr
}


// multiple time/price pairs in timePriceArr with # of shares in the portfolio (sharesArr)
export const calculateTimePortfolioValue = (sharesArr, timePriceArrFiltered = {}) => {
  let portfolioTimeValueArr = [];
  // loop through both arrays
  for (let index = 0; index < sharesArr.length; index++) {
    const shareQuantity = sharesArr[index];
    const tickerTimePriceObj = timePriceArrFiltered[index];

    // multiple price at each time point by shareQuantity
    let tickerTimeValueObj = {};
    for (let key of Object.keys(tickerTimePriceObj)) {
      let value = tickerTimePriceObj[key] * shareQuantity;
      tickerTimeValueObj[key] = value;
    }
    portfolioTimeValueArr.push(tickerTimeValueObj)
  }
  return portfolioTimeValueArr
}

// sum each stock value at same time point
export const sumPortfolioValue = (portfolioTimeValueArr) => {
  let portfolioValueArr = [];
  for (let tickerTimeValueObj of portfolioTimeValueArr) {
    const tickerValueArr = Object.values(tickerTimeValueObj);
    if (portfolioValueArr.length === 0) {
      portfolioValueArr = tickerValueArr
    } else {
      portfolioValueArr = sumNumSameIndex(tickerValueArr, portfolioValueArr)
    }
  }
  return portfolioValueArr;
}
