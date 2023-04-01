import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from "react-router-dom";
import "./SplashPage.css"

function SplashPage() {
  const sessionUser = useSelector(state => state.session.user)

  if (sessionUser) return <Redirect to="/dashboard" />

  return (
    <div className='top-darkgreen-container'>
      <video
        autoplay
        id="retirement-hero-fullwidth"
        controlslist="nodownload nofullscreen noremoteplayback"
        muted
        playsinline
        preload="auto"
        className="splash-video">
        <source src="https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/retirement-hero-hq__fd36683f19bdb708d711e355fd1ed28a.mp4" type="video/mp4" />
        {/* <source src="https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/retirement-hero__35c1299e0ae3dcae72dbfe019a82159b.mp4" type="video/mp4" /> */}
      </video>
      <div>Earn a 1% match.</div>
      <div>No employer necessary.</div>
      <div>Learn more.</div>
      <div>Limitations Apply</div>

    </div>
  )
}

export default SplashPage
