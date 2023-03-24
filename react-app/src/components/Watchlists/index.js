import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWatchlistStocksThunk } from '../../store/watchlist';
import WatchlistDetails from './WatchlistDetailsSection';
import AddWatchlistModal from './AddWatchlistModal';
import OpenModalButton from '../OpenModalButton'
import './Watchlist.css'
import { NavLink } from 'react-router-dom';

function Watchlists() {
  const dispatch = useDispatch()
  const watchlists = useSelector(state => state.watchlists)
  const sessionUser = useSelector(state => state.session.user)
  const [showDetailsId, setShowDetailsId] = useState(false)

  // hydrate redux store first
  useEffect(() => {
    dispatch(getAllWatchlistStocksThunk())
  }, [dispatch])

  // function to control only the watchlist being clicked shows details
  const displayDetails = watchlist => {
    if (showDetailsId !== watchlist.id) {
      setShowDetailsId(watchlist.id)
    } else {
      setShowDetailsId(null)
    }
  }

  return (
    <div className="watchlist-container">
      {sessionUser && (
        <>
          <div className='watchlist-name-sign-container' key='name-sign'>
            <div className='watchlist-label' key='label'>Watchlists</div>
            <OpenModalButton
              modalComponent={<AddWatchlistModal />}
              buttonText={<i className="add-watchlist-button fa-sharp fa-solid fa-plus"></i>}
              key='modal'
            />
          </div>
          <div className='watchlist-details-container' key='details'>
            {Object.values(watchlists).map(watchlist => (
              <>
                <div className='watchlist-list-name-expand-icon-container' key={watchlist.id}>
                  <NavLink
                    to={`/watchlists/${watchlist.id}`}
                    className='watchlist-list-name'
                    key={watchlist.list_name}
                  >
                    {watchlist.list_name}
                  </NavLink>
                  <div
                    className='watchlist-list-expand-icon'
                    onClick={() => displayDetails(watchlist)}
                    key={watchlist.id}
                  >
                    <i className="fa-solid fa-chevron-down"></i>
                  </div>
                </div>
                <div className='watchlist-stock-details-container' key={watchlist.list_name}>
                  {showDetailsId === watchlist.id && <WatchlistDetails watchlist={watchlist} />}
                </div>
              </>
            ))
            }
          </div>
        </>
      )}
    </div>
  )
}

export default Watchlists
