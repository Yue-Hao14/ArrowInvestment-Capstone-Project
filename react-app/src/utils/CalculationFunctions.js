// calculate portfolio's buying power based on all the cash transfers
export const calculateBuyingPower = (transfersArr, transactionsArr=[]) => {
  let buyingPower = 0;
  // add cash deposit/withdraw to buying power
  for (const transfer of transfersArr) {
    buyingPower += transfer.amount
  }
  // add stock buy/sell to buying power
  if (transactionsArr.length > 0) {
    for (const transaction of transactionsArr) {
      buyingPower += (transaction.quantity * transaction.settled_price)*-1
    }
  }
  return buyingPower
}
// .toLocaleString(undefined, { minimumFractionDigits: 2 })


// calculate # of existing shares of a ticker
export const calculateExistingShares = (transactionsArr) => {
  let shares = 0;
  for (const transaction of transactionsArr) {
    shares += transaction.quantity
  }
  return shares
}
