import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import watchlistReducer from './watchlist';
import transactionReducer from './transaction';
import portfolioReducer from './portfolio';
import transferReducer from './transfer';


const rootReducer = combineReducers({
  session,
  watchlists: watchlistReducer,
  transactions: transactionReducer,
  portfolios: portfolioReducer,
  transfers: transferReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
