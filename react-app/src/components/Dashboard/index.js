import Watchlists from "../Watchlists"
import PortfolioStock from "./PortfolioStock";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./Dashboard.css"
import { useEffect, useState } from "react";
import { getCashTransfersThunk } from "../../store/transfer";
import { calculateBuyingPower } from "../../utils/CalculationFunctions";
import { getAllTransactionsThunk } from "../../store/transaction";
import { fetchStockNews } from "../../utils/FetchStockData";

function DashboardPage() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const transfersArr = Object.values(useSelector(state => state.transfers))
  const allTransactionsArr = Object.values(useSelector(state => state.transactions.allTransactions))

  const [newsArr, setNewsArr] = useState([])
  // hydrate redux store's cash trasnfers slice as soon as user come to this page
  useEffect(() => {
    dispatch(getCashTransfersThunk())
    dispatch(getAllTransactionsThunk())
  }, [dispatch])

  // fetch news from polygon
  useEffect(() => {
    async function fetchNewsForDashboard() {
      const data = await fetchStockNews()
      console.log(data)
      setNewsArr(data.results)
    };
    fetchNewsForDashboard()
  }, [])

  // if user has not logged in, back to landing page
  if (!sessionUser) return <Redirect to="/" />;

  return (

    <div className="dashboard-page-container">
      <div className="dashboard-left-container">
        {/* portfolio chart section */}
        <img
          src="https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/04a63fd4f116951d91ad9b6037b42ee1.svg"
          className="dashboard-header-pic"
        />
        <h1 className="welcome-message">Welcome to Arrow Investment</h1>

        {/* Buying power section */}
        <div className="buying-power-container">
          <h3 className="buying-power-text">Buying Power</h3>
          <div className="buying-power-amount">${calculateBuyingPower(transfersArr, allTransactionsArr).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>

        {/* financial news section */}
        <h3 className="news-header">Read market news</h3>
          {newsArr.length > 0 &&
            newsArr.map(news => (
              <Link key={news.id} to={news.article_url} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                <div className="news-container">
                  <div className="news-pulisher-time-container">
                    <div className="news-pulisher">{news.publisher.name}</div>
                    <div className="news-time">
                      {(Date.now() - Date.parse(news.published_utc)) > 3.6e+6 ?
                        `${((Date.now() - Date.parse(news.published_utc)) / 3.6e+6).toFixed(0)}h`
                        :
                        `${((Date.now() - Date.parse(news.published_utc)) / 60000).toFixed(0)}m`}
                    </div>
                  </div>
                  <div className="news-title-pic-container">
                    <div className="news-title">{news.title}</div>
                    <img className="news-image" src={news.image_url} />
                  </div>
                </div>
              </Link>

            ))
          }

      </div>


      <div className="dashboard-right-container">
        <PortfolioStock />
        <Watchlists />
      </div>
    </div>


  )
}

export default DashboardPage
