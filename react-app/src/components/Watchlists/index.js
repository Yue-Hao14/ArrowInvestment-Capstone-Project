import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWatchlistStocksThunk } from '../../store/watchlist';
import WatchlistDetails from './WatchlistDetailsSection';
import AddWatchlistModal from './AddWatchlistModal';
import OpenModalButton from '../OpenModalButton'
import './Watchlist.css'
import { NavLink } from 'react-router-dom';

function Watchlists() {
  const dispatch = useDispatch();
  const watchlists = useSelector(state => state.watchlists);
  const sessionUser = useSelector(state => state.session.user);
  const [showDetailsId, setShowDetailsId] = useState(false);
  const [showSettingId, setShowSettingsId] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef()

  // hydrate redux store first
  useEffect(() => {
    dispatch(getAllWatchlistStocksThunk())
  }, [dispatch])

  // function to set showMenu to true once user click on the setting icon
  // and set showSettingId equal to this specific watchlist's id
  // so then dropdown menu only show up for the watchlist being clicked
  const openMenu = (watchlist) => {
    console.log("watchlist.id",!showMenu)
    if (!showMenu && showSettingId !== watchlist.id) {
      setShowSettingsId(watchlist.id)
      setShowMenu(true);
      console.log(showSettingId)
    } else {
      setShowSettingsId(null)
      setShowMenu(false);
    }
  };

  // function to control only the watchlist being clicked shows details
  const displayDetails = watchlist => {
    if (showDetailsId !== watchlist.id) {
      setShowDetailsId(watchlist.id)
    } else {
      setShowDetailsId(null)
    }
  }

  const handleDeleteWatchlist = (watchlistId) => {

  }

  const ulClassName = "setting-dropdown" + (showMenu ? "" : " hidden");

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
                <div className='watchlist-list-name-setting-expand-icon-container' key={watchlist.id}>
                  <NavLink
                    to={`/watchlists/${watchlist.id}`}
                    className='watchlist-list-name'
                    key={watchlist.list_name}
                  >
                    {watchlist.list_name}
                  </NavLink>
                  <div
                    className='watchlist-list-setting-icon'
                    onClick={() => openMenu(watchlist)}
                    key='setting-icon'
                  >
                    <i className="fa-solid fa-ellipsis"></i>
                  </div>
                  {showSettingId === watchlist.id &&
                    <ul className={ulClassName} ref={ulRef}>
                      <div
                        className='watchlist-list-setting-delete-watchlist-icon'
                        onClick={handleDeleteWatchlist(watchlist)}
                        key='delete-icon'
                      >
                        <i className="fa-solid fa-xmark" />
                        Delete watchlist
                      </div>
                    </ul>
                  }
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
