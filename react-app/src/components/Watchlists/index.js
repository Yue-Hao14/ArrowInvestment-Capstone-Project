import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWatchlistStocksThunk } from '../../store/watchlist';
import WatchlistDetails from './WatchlistDetailsSection';
import AddWatchlistModal from './AddWatchlistModal';
import DeleteWatchlistModal from './DeleteWatchlistModal';
import OpenModalButton from '../OpenModalButton'
import './Watchlist.css'
import { NavLink } from 'react-router-dom';

function Watchlists() {
  const dispatch = useDispatch();
  const watchlists = useSelector(state => state.watchlists);
  const sessionUser = useSelector(state => state.session.user);
  const [showDetailsId, setShowDetailsId] = useState(false);
  const [showSettingId, setShowSettingId] = useState(false);
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
    // console.log("watchlist.id",!showMenu)
    if (!showMenu && showSettingId !== watchlist.id) {
      setShowSettingId(watchlist.id)
      setShowMenu(true);
      // console.log(showSettingId)
    } else {
      setShowSettingId(null)
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

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "setting-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

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
                      <i className="fa-solid fa-xmark" />
                      <OpenModalButton
                        buttonText="Delete watchlist"
                        onItemClick={closeMenu}
                        className="watchlist-delete-button"
                        modalComponent={<DeleteWatchlistModal watchlist={watchlist}/>}
                      />
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
