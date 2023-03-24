
// constants
const GET_ALL_WATCHLISTS_STOCKS = 'watchlists/GET_ALL_WATCHLISTS_STOCKS'
const ADD_WATCHLIST = 'watchlist/ADD_WATCHLIST'
const ADD_STOCK_TO_WATCHLISTS = 'watchlist/ADD_STOCK_TO_WATCHLISTS'
const DELETE_STOCK_FROM_WATCHLIST = 'watchlist/DELETE_STOCK_FROM_WATCHLIST'
const DELETE_WATCHLIST = 'watchlist/DELETE_WATCHLIST'
const RESET = 'watchlist/RESET'

// action creators
export const getAllWatchlistStocks = watchlistsStocks => ({
  type: GET_ALL_WATCHLISTS_STOCKS,
  payload: watchlistsStocks
})

export const addWatchlist = watchlistsStocks => ({
  type: ADD_WATCHLIST,
  payload: watchlistsStocks
})

export const addStockToWatchlists = watchlistsStocks => ({
  type: ADD_STOCK_TO_WATCHLISTS,
  payload: watchlistsStocks
})

export const deleteStockFromWatchlist = watchlistsStocks => ({
  type: DELETE_STOCK_FROM_WATCHLIST,
  payload: watchlistsStocks
})

export const deleteWatchlist = watchlistsStocks => ({
  type: DELETE_WATCHLIST,
  payload: watchlistsStocks
})

export const resetStore = () => ({
  type: RESET
})


// thunks
export const getAllWatchlistStocksThunk = () => async (dispatch) => {
  const res = await fetch('/api/watchlists/');

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllWatchlistStocks(data));
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

export const addWatchlistThunk = (watchlist) => async (dispatch) => {
  const res = await fetch('/api/watchlists/', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(watchlist)
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(addWatchlist(data))
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

export const addStocktoWatchlistThunk = (request) => async (dispatch) => {
  // console.log("JSON.stringify(request)", JSON.stringify(request))
  const res = await fetch('/api/watchlists/stock', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request)
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(addStockToWatchlists(data));
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

export const removeStockFromWatchlistThunk = (watchlistId, ticker) => async (dispatch) => {
  const res = await fetch(`/api/watchlists/${watchlistId}/stock/${ticker}`, {
    method: "DELETE"
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(resetStore());
    dispatch(deleteStockFromWatchlist(data));
    return data
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An Error occurred. Please try again later."];
  }
}

export const deleteWatchlistThunk = (watchlistId) => async (dispatch) => {
  const res = await fetch(`/api/watchlists/${watchlistId}`, {
    method: "DELETE"
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(resetStore());
    dispatch(deleteWatchlist(data))
    return data
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An Error occurred. Please try again later."];
  }
}


// reducers
const initialState = {}
export default function watchlistReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_WATCHLISTS_STOCKS: {
      const newState = { ...state }
      // console.log("action.payload", action.payload)
      for (const watchlist of action.payload) {
        newState[watchlist.id] = watchlist
      }
      return newState
    }
    case ADD_WATCHLIST: {
      const newState = { ...state }
      for (const watchlist of action.payload) {
        newState[watchlist.id] = watchlist
      }
      return newState
    }
    case ADD_STOCK_TO_WATCHLISTS: {
      const newState = { ...state }
      for (const watchlist of action.payload) {
        newState[watchlist.id] = watchlist
      }
      return newState
    }
    case DELETE_STOCK_FROM_WATCHLIST: {
      const newState = { ...state }
      for (const watchlist of action.payload) {
        newState[watchlist.id] = watchlist
      }
      return newState
    }
    case DELETE_WATCHLIST: {
      const newState = { ...state }
      for (const watchlist of action.payload) {
        newState[watchlist.id] = watchlist
      }
      return newState
    }
    case RESET: {
      return initialState;
    }
    default:
      return state
  }
}
