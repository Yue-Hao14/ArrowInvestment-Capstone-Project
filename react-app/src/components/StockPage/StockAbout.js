import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchTickerDetails } from '../../utils/FetchStockData'

function StockAbout() {
  const [stockInfo, setStockInfo] = useState()
  const [addressInfo, setAddressInfo] = useState()
  let { ticker } = useParams();
  ticker = ticker.toUpperCase();

  useEffect(() => {
    async function fetchStockInfo() {
      const data = await fetchTickerDetails(ticker);
      if (data.results) {
        setStockInfo(data.results)
        setAddressInfo(data.results.address)
      }
    };
    fetchStockInfo()
  }, [ticker])

  if (!stockInfo || !addressInfo) return null

  return (
    <>
      <h2 className='company-about-title'>About</h2>
      <div className='company-about-container'>
        <div className='company-description'>{stockInfo?.description}</div>
        <div className='company-about-bottom-container'>
          <div className='company-about-employees'>
            <div className='label'>Employees</div>
            <div className='content'>{stockInfo?.total_employees}</div>
          </div>
          <div className='company-about-headquarters'>
            <div className='label'>Headquarters</div>
            <div className='content'>{addressInfo.city[0] + addressInfo.city.slice(1).toLowerCase()}, {addressInfo.state}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StockAbout
