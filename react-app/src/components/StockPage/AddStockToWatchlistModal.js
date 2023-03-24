import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { addStocktoWatchlistThunk, getAllWatchlistStocksThunk } from '../../store/watchlist';
import './AddStockToWatchlistModal.css'

// TO DO: FIGURE OUT HOW TO PRESELECT CHECKBOX WHERE CURRENT STOCK IS ALREADY PART OF THE WATCHLIST

function AddStockToWatchlistModal({ ticker }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const watchlistsArr = Object.values(useSelector(state => state.watchlists)) // all watchlists user have
  const [isButtonActive, setIsButtonActive] = useState(false)
  const [selectedWatchlistArr, setSelectedWatchlistArr] = useState([])

  // assemble a list of watchlistId that this stock is already in
  let stockInWatchlistIdArr = []
  for (const watchlist of watchlistsArr) {
    const stocksArr = watchlist.stocks
    for (const stock of stocksArr) {
      if (stock.ticker === ticker) {
        stockInWatchlistIdArr.push(watchlist.id)
      }
    }
  }

  // hydrate redux store as soon as user come to stock page
  useEffect(() => {
    dispatch(getAllWatchlistStocksThunk())
  }, [dispatch])


  const handleCheckboxChange = (e, watchlist) => {
    // console.log("e.target.checked", e.target.checked)

    // when a watchlist is selected, add watchlistId to selectedWatchlistArr
    if (e.target.checked) {
      setSelectedWatchlistArr([...selectedWatchlistArr, watchlist.id])
      setIsButtonActive(true)
    }
    // when a watchlist is de-selected and it's already been added to stockInWatchlistIdArr, filter it out
    if (!e.target.checked && selectedWatchlistArr.includes(watchlist.id)) {
      setSelectedWatchlistArr(selectedWatchlistArr.filter(id => id !== watchlist.id))
      setIsButtonActive(selectedWatchlistArr.length > 1)
    }

  }
  console.log("selectedWatchlistArr", selectedWatchlistArr)


  const handleSubmit = async (e) => {
    e.preventDefault();

    // pass info as a request to backend
    const request = {
      watchlistId: selectedWatchlistArr,
      ticker
    }
    console.log('request',request)
    const data = await dispatch(addStocktoWatchlistThunk(request))

    // if response from backend is good, close modal;
    // if not show error on the modal
    if (data) {
      closeModal()
    }
  }

  return (
    <div className="add-stock-to-watchlist-modal-container">
      <div className="add-stock-to-watchlist-modal-top-container">
        <div className="add-stock-to-watchlist-modal-title">Add {ticker} to Your Lists</div>
        <div className="add-stock-to-watchlist-modal-exit-button-container">
          <button
            type="button"
            onClick={closeModal}
            className="add-stock-to-watchlist-modal-exit-button"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="add-stock-to-watchlist-modal-watchlists-container">
          {watchlistsArr.map(watchlist => (
            < div className="add-stock-to-watchlist-modal-watchlists-container" >
              <label className='add-stock-to-watchlist-modal-checkbox'>
                <input
                  type='checkbox'
                  onChange={e => handleCheckboxChange(e, watchlist)}
                />
                <div className='add-stock-to-watchlist-modal-checkbox-text'>{watchlist.list_name}</div>
              </label>
            </div>
          ))
          }
        </div>
        <div className='add-stock-to-watchlist-modal-save-button-container'>
          <button
            type='submit'
            disabled={!isButtonActive}
            className='add-stock-to-watchlist-modal-save-button'
          >
            Save Changes
          </button>
        </div>
      </form>
    </div >
  )
}

export default AddStockToWatchlistModal
