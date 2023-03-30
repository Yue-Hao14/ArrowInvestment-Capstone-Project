import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchTickerDetails } from '../../utils/FetchStockData'

function StockAbout() {
  const [stockInfo, setStockInfo] = useState({})
  const [addressInfo, setAddressInfo] = useState({})
  const { ticker } = useParams()

  useEffect(() => {
    async function fetchStockInfo(ticker) {
      const data = await fetchTickerDetails(ticker);
      // console.log("data", data)
      setStockInfo(data.results)
      setAddressInfo(data.results.address)
    };
    fetchStockInfo()
  }, [ticker])

  return (
    <>
      <h2>About</h2>
      <div className='company-about-container'>
        <div className='company-description'>{stockInfo.description}</div>
        <div className='company-about-bottom-container'>
          <div className='company-about-employees'>
            <div className='label'>Employees</div>
            <div className='content'>{stockInfo.total_employees}</div>
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
