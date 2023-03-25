import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { deleteWatchlistThunk } from '../../store/watchlist';
import './DeleteWatchlistModal.css'

function DeleteWatchlistModal({ watchlist }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteWatchlist = async (e)=> {
    e.preventDefault()
    const data = await dispatch(deleteWatchlistThunk(watchlist.id))
    if (data) {
      closeModal()
    }
  }

  return (
    <div className='delete-watchlist-modal-container'>
      <div className='delete-watchlist-modal-title-container'>
        <div className='delete-watchlist-modal-title'>
          Are you sure you want to delete "{watchlist.list_name}"?
        </div>
        <div className='delete-watchlist-modal-close-button'>
          <button
            type="button"
            onClick={closeModal}
            className="add-stock-to-watchlist-modal-exit-button"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      </div>
      <div className='delete-watchlist-modal-warning'>
        If you delete this watchlist and its {watchlist.stocks.length} item, it’ll be gone forever!
      </div>
      <div className='delete-watchlist-modal-delete-button'>
      <button
            type="button"
            onClick={e => handleDeleteWatchlist(e)}
            className="delete-watchlist-modal-exit-button"
          >
            Delete {watchlist.list_name}
          </button>
      </div>
    </div>
  )
}

export default DeleteWatchlistModal
