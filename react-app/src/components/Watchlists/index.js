import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWatchlistStocksThunk } from '../../store/watchlist';

function Watchlists () {
  const dispatch = useDispatch()

  // hydrate redux store
  useEffect(()=> {
    dispatch(getAllWatchlistStocksThunk())
  },[dispatch])

  return (
    <div className="watchlist-container">
      <div className="watchlist-name">
        <h1>watchlist</h1>
      </div>
    </div>
  )
}

export default Watchlists
