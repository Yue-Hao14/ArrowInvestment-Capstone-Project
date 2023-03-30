import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { addWatchlistThunk } from '../../store/watchlist';

function AddWatchlistModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [listName, setListName] = useState('')
  const [errors, setErrors] = useState([])
  const userId = useSelector(state => state.session.user.id)

  const handleSubmit = async e => {
    e.preventDefault()

    // pass info as a request to backend
    const newWatchlist = { listName, userId }
    const data = await dispatch(addWatchlistThunk(newWatchlist))

    // if response from backend is good, close modal;
    // if not show error on the modal
    if (!data) {
      setErrors(data)
    } else {
      closeModal()
    }
  };

  return (
    <form className='add-watchlist-modal-form' onSubmit={handleSubmit}>
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
      <button type='submit'
        className='add-watchlist-modal-submit-button'
      >
        Add Watchlist
      </button>
    </form>
  )
}

export default AddWatchlistModal
