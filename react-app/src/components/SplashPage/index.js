import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from "react-router-dom";

function SplashPage() {
  const sessionUser = useSelector(state => state.session.user)

  if (sessionUser) return <Redirect to="/dashboard" />
  
  return (
    <h1>Welcome to Splash Page</h1>
  )
}

export default SplashPage
