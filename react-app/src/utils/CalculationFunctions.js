// calculate portfolio's buying power based on all the cash transfers
export const calculateBuyingPower = (transfersArr, allTransactionsArr=[]) => {
  let buyingPower = 0;
  // add cash deposit/withdraw to buying power
  for (const transfer of transfersArr) {
    buyingPower += transfer.amount
  }
  // add stock buy/sell to buying power
  if (allTransactionsArr.length > 0) {
    for (const transaction of allTransactionsArr) {
      buyingPower += (transaction.quantity * transaction.settled_price)*-1
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
  // if there is transactions, put ticker-quantity as KVP into an object
  // if there is no transactions, then return an empty obj
  if (transactionsArr.length > 0) {
    let tickerShareObj = {}
    transactionsArr.forEach(transaction => {
      if (tickerShareObj[transaction.stock_ticker]) {
        tickerShareObj[transaction.stock_ticker] += transaction.quantity
      } else {
        tickerShareObj[transaction.stock_ticker] = transaction.quantity
      }
    });
    return tickerShareObj
  } else return {}
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



// calculate portfolio value over time
// portfolio value overtime takes in dateDuration, multiplier, timespan (5min, 1D, 7D etc.), transfersArr, allTransactionArr
// and then fetch polygon for stock price for that time period for each stock
// then pass the stock price to calculatePortfolioValueSnapshot helper function to calcuate portfolio value at point of time
export const calculatePortfolioValueOverTime = (multiplier, timeSpan, dateDuration, transfersArr, allTransactionsArr=[]) => {
  return null
}

// calculate portfolio value at time T = buying power T + sum(# share of A stock at T * stock price at T) for each stock
export const calculatePortfolioValueSnapshot = (stockPriceArr, transfersArr, allTransactionsArr=[]) => {
  return null
}
