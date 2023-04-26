import Watchlists from "../Watchlists"
import PortfolioStock from "./PortfolioStock";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Dashboard.css"
import { useEffect, useState } from "react";
import { getCashTransfersThunk } from "../../store/transfer";
import { calculateBuyingPower } from "../../utils/CalculationFunctions";
import { getAllTransactionsThunk } from "../../store/transaction";
import News from "./News";
import PortfolioChart from "./PortfolioChart";
import Loading from "../Loading";

function DashboardPage() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const transfersArr = Object.values(useSelector(state => state.transfers))

  const allTransactionsArr = Object.values(useSelector(state => state.transactions.allTransactions))

  const [isLoaded, setIsLoaded] = useState(false)
  // console.log("allTransactionsArr before useEffect in DashboardPage", allTransactionsArr)
  // hydrate redux store's cash trasnfers slice as soon as user come to this page
  useEffect(() => {
    dispatch(getCashTransfersThunk())
    dispatch(getAllTransactionsThunk())
    setIsLoaded(true)
  }, [dispatch])
  // console.log("allTransactionsArr after useEffect in DashboardPage", allTransactionsArr)

  // if user has not logged in, back to landing page
  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
      {isLoaded ?
        <div className="dashboard-page-container">
          <div className="dashboard-left-container" >
            {/* portfolio chart section */}
            {/* < img
              src="https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/04a63fd4f116951d91ad9b6037b42ee1.svg"
              className="dashboard-header-pic"
            /> */}
            <PortfolioChart allTransactionsArr={allTransactionsArr} />

            {/* Buying power section */}
            < div className="buying-power-container" >
              <h3 className="buying-power-text">Buying Power</h3>
              <div className="buying-power-amount">${calculateBuyingPower(transfersArr, allTransactionsArr).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div >

            {/* financial news section */}
            < News ticker="" />

          </div >
          <div className="dashboard-right-container">
            <PortfolioStock />
            <Watchlists />
          </div>
        </div >
        :
        <Loading />
      }
    </>
  )
}

export default DashboardPage
