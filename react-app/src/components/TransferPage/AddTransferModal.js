import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'

function AddTransferModal() {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState();
  const [errors, setErrors] = useState();

  

  return (
    <div>Start a transfer</div>
  )
}

export default AddTransferModal
