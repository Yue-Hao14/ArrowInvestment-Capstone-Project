// actions
const GET_PORTFOLIO = 'portfolios/GET_PORTFOLIO'

// action creators
export const getPortfolio = portfolio => ({
  type: GET_PORTFOLIO,
  payload: portfolio
})

// thunks
export const getPortfolioThunk = () => async (dispatch) => {
  const res = await fetch('/api/portfolios/');

  if (res.ok) {
    const data = await res.json();
    dispatch(getPortfolio(data));
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

export const createPortfolioThunk = () => async (dispatch) => {
  const res = await fetch('/api/portfolios/', {
    method: "POST",
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(getPortfolio(data));
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
export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PORTFOLIO: {
      return action.payload
    }
    default:
      return state
  }
}
