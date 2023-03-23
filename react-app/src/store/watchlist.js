// constants
const GET_ALL_WATCHLISTS_STOCKS = 'watchlists/GET_ALL_WATCHLISTS_STOCKS'
const ADD_WATCHLIST = 'watchlist/ADD_WATCHLIST'


// action creators
export const getAllWatchlistStocks = watchlistsStocks => ({
  type: GET_ALL_WATCHLISTS_STOCKS,
  payload: watchlistsStocks
})

export const addWatchlist = watchlistsStocks => ({
  type: ADD_WATCHLIST,
  payload: watchlistsStocks
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
    default:
      return state
  }
}
