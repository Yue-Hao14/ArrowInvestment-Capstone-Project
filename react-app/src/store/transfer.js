// actions
const GET_CASH_TRANSFERS = 'transfer/GET_CASH_TRANSFERS'
const RESET = 'transfer/RESET'

// action creators
export const getCashTransfers = transfers => ({
  type: GET_CASH_TRANSFERS,
  payload: transfers
})

export const resetTransfer = () => ({
  type: RESET
})

// thunks
export const getCashTransfersThunk = () => async (dispatch) => {
  const res = await fetch('/api/cash_transfers/');

  if (res.ok) {
    const data = await res.json();
    dispatch(getCashTransfers(data));
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

export const addCashTransfersThunk = (cashTransfer) => async (dispatch) => {
  const res = await fetch('/api/cash_transfers/', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cashTransfer)
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(getCashTransfers(data))
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

// reducer
const initialState = {}
export default function transferReducer(state=initialState, action) {
  switch (action.type) {
    case GET_CASH_TRANSFERS: {
      const newState = {...state};
      for (const cashTransfer of action.payload) {
        newState[cashTransfer.id] = cashTransfer;
      }
      return newState;
    }
    case RESET: {
      return initialState;
    }
    default:
      return state;
  }
}
