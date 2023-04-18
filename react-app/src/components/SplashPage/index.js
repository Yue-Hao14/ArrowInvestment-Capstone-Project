import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from "react-router-dom";
import "./SplashPage.css"
import img1 from './img1.png'
import img2 from './img2.png'
import img3 from './img3.png'
import img4 from './img4.png'
import img5 from './img5.jpeg'
import img6 from './img6.png'
import img7 from './img7.png'


function SplashPage() {
  const sessionUser = useSelector(state => state.session.user)
  const [slidePosition, setSlidePosition] = useState(0);
  const cards = [
    {
      image: img1,
      title: "Step up to the new 4.4% APY",
      description: "Elevate your earnings to our new all-time high rate on uninvested cash. It’s FDIC-insured up to $1.5 million through partner banks.* Terms apply."
    },
    {
      image: img2,
      title: "Limited-time IRA offer",
      description: "Until April 18, every dollar from outside accounts gets a 1% match--including IRA and 401(k) transfers."
    },
    {
      image: img3,
      title: "The only IRA with a match.",
      description: "Introducing Robinhood Retirement - Get a 1% match, custom recommended portfolios, and no commission fees."
    },
    {
      image: img4,
      title: "Earn income on stocks you own",
      description: "Get the opportunity to earn income on stocks you already own—just by turning on Stock Lending."
    },
    {
      image: img5,
      title: "Own & control your crypto. Swap with no network fees.",
      description: "Robinhood Wallet is your self-custody home for crypto, NFTs, web3, and dapps."
    },
    {
      image: img6,
      title: "Give the gift of crypto",
      description: "Crypto gifts allow you to send your favorite crypto to your favorite people from the Robinhood app."
    },
    {
      image: img7,
      title: "Choose your free stock",
      description: "Sign up for Robinhood or refer a friend to choose your free fractional share in companies you love. Certain limitations apply."
    }
  ]

  if (sessionUser) return <Redirect to="/dashboard" />


  const cardWidth = 100 / (cards.length - 4.7);

  const handlePrevClick = () => {
    const newPosition = slidePosition === 0 ? cards.length - 1 : slidePosition - 1;
    setSlidePosition(newPosition);
  }

  const handleNextClick = () => {
    const newPosition = slidePosition === cards.length - 1 ? 0 : slidePosition + 1;
    setSlidePosition(newPosition);
  };

  return (
    <div className='landing-page-container'>
      {/* Top green section */}
      <div className='top-darkgreen-container'>
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          className="splash-video">
          <source media="(min-width:1400px)" src="https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/retirement-hero-hq__fd36683f19bdb708d711e355fd1ed28a.mp4" type="video/mp4" />
          <source src="https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/retirement-hero__35c1299e0ae3dcae72dbfe019a82159b.mp4" type="video/mp4" />
        </video>
        <div className='bottom-darkgreen-container'>
          <div className='dark-green-area-message'>Earn a 1% match.</div>
          <div className='dark-green-area-message'>No employer necessary.</div>
          <button className='dark-green-area-learn-more-button' onClick={() => alert("Feature coming soon...")}>Learn more.</button>
          <div className='dark-green-area-limitation'>
            <i className="fa-solid fa-circle-info" />
            Limitations apply
          </div>
        </div>
      </div>

      {/* free money section */}
      <div className='free-money-container'>
        Get free money when you signup. <span>Limitations Apply.</span>
      </div>

      {/* slider section */}
      <div className='slider-container'>
        <div className='slider-title-button-container'>
          <div className='slider-title'>Check out our latest</div>
          <div className='slider-position-buttons-container'>
            <div className='slider-position'>{slidePosition + 1}/{cards.length}</div>
            <button className='slider-prev-button' onClick={handlePrevClick}>←</button>
            <button className='slider-next-button' onClick={handleNextClick}>→</button>
          </div>
        </div>

        <div className='slider-cards-container'
          style={{ transform: `translateX(-${slidePosition * cardWidth}%)` }}>
          {cards.map(card => (
            <div className='slider-card' key={card.title}>
              <img src={card.image} className='slider-card-image' />
              <div className='slider-card-title-description-container'>
                <div className='slider-card-title'>{card.title}</div>
                <div className='slider-card-description-button-container'>
                  <div className='slider-card-description'>{card.description}</div>
                  <button className='slider-card-learn-more-button' onClick={() => alert("Feature coming soon...")}>Learn more.</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer section */}

    </div>
  )
}

export default SplashPage
