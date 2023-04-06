import { useDispatch, useSelector } from 'react-redux'
import { getCashTransfersThunk } from '../../store/transfer';
import { useEffect, useState } from 'react'

function TransferPage() {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  // hydrate redux store with transfers slice
  useEffect(() => {
    dispatch(getCashTransfersThunk());
  }, [dispatch])

  return (
    <h1>Welcome to Cash Transfer Page</h1>
  )
}

export default TransferPage
