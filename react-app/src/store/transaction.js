// actions
const GET_ALL_TRANSACTIONS = 'transactions/GET_ALL_TRANSACTIONS'
const GET_ALL_TRANSACTIONS_BY_TICKER = 'transactions/GET_ALL_TRANSACTIONS_BY_TICKER'
const ADD_TRANSACTION = 'transactions/ADD_TRANSACTION'
const RESET = 'transactions/RESET'

// action creators
export const getAllTransactions = transactions => ({
  type: GET_ALL_TRANSACTIONS,
  payload: transactions
})

export const getAllTransactionsByTicker = transactions => ({
  type: GET_ALL_TRANSACTIONS_BY_TICKER,
  payload: transactions
})

export const resetTransactions = () => ({
  type: RESET
})


// thunks
export const getAllTransactionsThunk = () => async (dispatch) => {
  const res = await fetch('/api/transactions/')
  if (res.ok) {
    const data = await res.json();
    dispatch(getAllTransactions(data));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors
    }
  } else {
    return ["An Error occurred. Please try again later."]
  }
}

export const getAllTransactionsByTickerThunk = (ticker) => async (dispatch) => {
  const res = await fetch(`/api/transactions/${ticker}`)
  if (res.ok) {
    const data = await res.json();
    dispatch(getAllTransactionsByTicker(data));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors
    }
  } else {
    return ["An Error occurred. Please try again later."]
  }
}

export const addTransactionThunk = (request) => async (dispatch) => {
  const res = await fetch('/api/transactions/', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request)
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllTransactionsByTicker(data));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An Error occurred. Please try again later."];
  }
}


// reducer
const initialState = {
  allTransactions: {},
  tickerTransactions: {}
}

export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TRANSACTIONS: {
      const newState = { ...state };
      const transactions = {};
      for (const transaction of action.payload) {
        transactions[transaction.id] = transaction;
      }
      newState.allTransactions = transactions
      return newState;
    }
    case GET_ALL_TRANSACTIONS_BY_TICKER: {
      const newState = { ...state };
      const transactionsByTicker = {};
      for (const transaction of action.payload) {
        transactionsByTicker[transaction.id] = transaction;
      }
      newState.tickerTransactions = transactionsByTicker
      return newState;
    }
    case RESET: {
      return initialState;
    }
    default:
      return state
  }
}
