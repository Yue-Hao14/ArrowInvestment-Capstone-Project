import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'

function AddWatchlistModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [listName, setListName] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = async e => {
    e.preventDefault()

    
  };

  return (
    <form className='add-watchlist-modal-form' onsubmit={handleSubmit}>
      <div className='add-watchlist-modal-title'>Add a Watchlist</div>
      <ul className='add-watchlist-modal-error-list'>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <input
        type='text'
        value={listName}
        onChange={e => setListName(e.target.value)}
        required
        placeholder='enter watchlist name...'
        className='add-watchlist-modal-input'
      />
      <button type='button' onClick={closeModal}
        className='add-watchlist-modal-cancel-button'
      >
        Cancel
      </button>
      <button type='submit' className='add-watchlist-modal-submit-button'>Submit</button>
    </form>
  )
}

export default AddWatchlistModal
