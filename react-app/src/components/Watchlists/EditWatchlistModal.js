import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { editWatchlistThunk } from '../../store/watchlist';
import { useState, useEffect } from 'react';
import './WatchlistModal.css'

function EditWatchlistModal({ watchlist }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [listName, setListName] = useState('');
  const [errors, setErrors] = useState([]);

  // error handling
  useEffect(() => {
    let e = [];
    if (listName.length === 0) {
      e.push('List name cannot be empty')
    }
    setErrors(e);
  }, [listName])


  const handleEditWatchlist = async (e) => {
    e.preventDefault();
    if (errors.length === 0) {
      const updatedWatchlist = {
        id: watchlist.id,
        listName
      }

      const data = await dispatch(editWatchlistThunk(updatedWatchlist));
      if (data) {
        closeModal()
      }
    }
  }

  return (
    <div className='edit-watchlist-modal-container'>
      <div className='edit-watchlist-modal-header'>
        <h4>Edit List</h4>
        <button
          type="button"
          onClick={closeModal}
          className="edit-watchlist-modal-exit-button"
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
      <div className='edit-watchlist-modal-body'>
        <img className='light-bulb-icon'
          src="https://cdn.robinhood.com/emoji/v0/128/1f4a1.png"
          alt="light bulb"
        />
        <input
          type="text"
          placeholder={watchlist.list_name}
          onChange={e => setListName(e.target.value)}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={handleEditWatchlist}
          className='edit-watchlist-modal-save-button'>Save</button>
      </div>
    </div>
  )
}

export default EditWatchlistModal
