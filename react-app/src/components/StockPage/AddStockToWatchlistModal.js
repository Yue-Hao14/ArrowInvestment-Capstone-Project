import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import './AddStockToWatchlistModal.css'

function AddStockToWatchlistModal({ ticker }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

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

      <div className="add-stock-to-watchlist-modal-create-new-list-container">
        <div></div>
      </div>
    </div>
  )
}

export default AddStockToWatchlistModal
