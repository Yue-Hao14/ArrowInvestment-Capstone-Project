import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWatchlistStocksThunk } from '../../store/watchlist';
import WatchlistDetails from './WatchlistDetailsSection';
import AddWatchlistModal from './AddWatchlistModal';
import DeleteWatchlistModal from './DeleteWatchlistModal';
import OpenModalButton from '../OpenModalButton'
import './Watchlist.css'
import { NavLink } from 'react-router-dom';
import { addWatchlistThunk } from '../../store/watchlist';


function Watchlists() {
  const dispatch = useDispatch();
  const ulRef = useRef();
  const watchlists = useSelector(state => state.watchlists);
  const sessionUser = useSelector(state => state.session.user);
  const userId = useSelector(state => state.session.user.id);

  const [showDetailsId, setShowDetailsId] = useState(false);
  const [showSettingId, setShowSettingId] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showAddList, setShowAddList] = useState(false);
  const [listName, setListName] = useState('');
  const [errors, setErrors] = useState()

  // hydrate redux store first
  useEffect(() => {
    dispatch(getAllWatchlistStocksThunk());
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

  // function to close setting dropdown menu when mouse click outside of it
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

  // function that set showAddList to true when user click on the "+" icon
  const openAddList = () => {
    setShowAddList(true);
  }
  // function that set showAddList to false when user click on the "cancel" button
  const closeAddList = () => {
    setShowAddList(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // pass info as a request to backend
    if (listName.length > 0) {
      const newWatchlist = { listName, userId }
      const data = await dispatch(addWatchlistThunk(newWatchlist))
      setShowAddList(false) // close add list section
    } else {
      setErrors("List name is required.")
    }
  }


  // function to control only the watchlist being clicked shows details
  const displayDetails = watchlist => {
    if (showDetailsId !== watchlist.id) {
      setShowDetailsId(watchlist.id)
    } else {
      setShowDetailsId(null)
    }
  }

  const ulClassName = "setting-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="watchlist-container">
      {sessionUser && (
        <>
          <div className='watchlist-name-add-sign-container' key='name-sign'>
            <div className='watchlist-label' key='label'>Lists</div>
            <div className='watchlist-add-sign'>
              <button onClick={openAddList}><i className="add-watchlist-button fa-sharp fa-solid fa-plus"></i></button>
            </div>
          </div>
          <div className='watchlist-add-sign-dropdown-container'>
            {showAddList &&
              <>
                <div className='watchlist-add-sign-dropdown-input-container'>
                  <div className='add-list-error'>{errors}</div>
                  <div className='light-bulb-icon-container'>
                    <img className='light-bulb-icon'
                      src="https://cdn.robinhood.com/emoji/v0/128/1f4a1.png"
                    />
                  </div>
                  <input
                    type='text'
                    onChange={e => setListName(e.target.value)}
                    required
                    placeholder='List Name'
                    className='add-watchlist-input'
                  />
                </div>
                <div className='watchlist-add-sign-dropdown-buttons-container'>
                  <button type='button' onClick={closeAddList}
                    className='add-watchlist-cancel-button'
                  >
                    Cancel
                  </button>
                  <button type='submit' onClick={handleSubmit}
                    className='add-watchlist-submit-button'
                  >
                    Create List
                  </button>
                </div>
              </>
            }
          </div>
          <div className='watchlist-details-container' key='details'>
            {Object.values(watchlists).map(watchlist => (
              <>
                <div className='watchlist-list-name-setting-expand-icon-container' key={watchlist.id}>
                  <div className='watchlist-list-name-setting-expand-icon'>
                    <div className='watchlist-icon-name-container'>
                      <div className='light-bulb-icon-container'>
                        <img className='light-bulb-icon'
                          src="https://cdn.robinhood.com/emoji/v0/128/1f4a1.png"
                        />
                      </div>
                      <NavLink
                        to={`/watchlists/${watchlist.id}`}
                        className='watchlist-list-name'
                        key={watchlist.list_name}
                      >
                        {watchlist.list_name}
                      </NavLink>
                    </div>
                    <div className='watchlist-setting-dropdown-icons'>
                      <div
                        className='watchlist-list-setting-icon'
                        onClick={() => openMenu(watchlist)}
                        key='setting-icon'
                      >
                        <i className="fa-solid fa-ellipsis"></i>
                      </div>
                      <div
                        className='watchlist-list-expand-icon'
                        onClick={() => displayDetails(watchlist)}
                        key={watchlist.id}
                      >
                        <i className="fa-solid fa-chevron-down"></i>
                      </div>
                    </div>
                  </div>
                  <div className='watchlist-setting-dropdown-container'>
                    {showSettingId === watchlist.id &&
                      <div className={ulClassName} ref={ulRef}>
                        <div className='watchlist-setting-dropdown-row'>
                          <i className="fa-solid fa-xmark" />
                          <OpenModalButton
                            buttonText="Delete watchlist"
                            onItemClick={closeMenu}
                            className="watchlist-delete-button"
                            modalComponent={<DeleteWatchlistModal watchlist={watchlist} />}
                          />
                        </div>
                      </div>
                    }

                  </div>
                </div>
                <div className='watchlist-stock-details-container' key={watchlist.list_name}>
                  {showDetailsId === watchlist.id &&
                    watchlist.stocks.map(stock => (
                      <WatchlistDetails ticker={stock.ticker} key={stock.ticker} />
                    ))}
                </div>
              </>
            ))
            }
          </div>
        </>
      )
      }
    </div >
  )
}

export default Watchlists
