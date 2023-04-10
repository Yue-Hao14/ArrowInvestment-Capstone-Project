// calculate portfolio's buying power based on all the cash transfers
export const calculateBuyingPower = (transfersArr) => {
  let buyingPower = 0
  for (const transfer of transfersArr) {
    buyingPower += transfer.amount
  }
  return buyingPower.toLocaleString(undefined, { minimumFractionDigits: 2 })
}
