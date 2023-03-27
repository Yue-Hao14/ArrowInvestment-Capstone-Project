export const dbDateToDisplay = (date) => {
  const JSdate = new Date(date.slice(0,17)).toDateString().slice(4)
  // console.log("JSdate",JSdate)
  const monthDate = JSdate.slice(0,6)
  const year = JSdate.slice(7)
  return monthDate + ", " + year
}

// console.log(dbDateToDisplay("Wed, 01 Mar 2023 00:00:00 GMT"))
