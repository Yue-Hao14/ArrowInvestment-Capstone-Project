import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWatchlistStocksThunk } from '../../store/watchlist';
import WatchlistDetails from './WatchListDetails';
import './Watchlist.css'
import AddWatchlistModal from './AddWatchlistModal';
import OpenModalButton from '../OpenModalButton'

function Watchlists() {
  const dispatch = useDispatch()
  const watchlists = useSelector(state => state.watchlists)
  const sessionUser = useSelector(state => state.session.user)
  const [showDetailsId, setShowDetailsId] = useState(false)

  // hydrate redux store
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
          <div className='watchlist-name-sign-container'>
            <div className='watchlist-label'>Watchlists</div>
            <OpenModalButton
              modalComponent={<AddWatchlistModal />}
              buttonText={<i className="add-watchlist-button fa-sharp fa-solid fa-plus"></i>}
            />
          </div>
          <div className='watchlist-details-container'>
            {Object.values(watchlists).map(watchlist => (
              <>
                <div className='watchlist-list-name'
                  onClick={() => displayDetails(watchlist)}
                >
                  {watchlist.list_name}
                </div>
                <div className='watchlist-stock-details-container'>
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
