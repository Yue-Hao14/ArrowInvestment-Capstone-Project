import Watchlists from "../Watchlists"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Dashboard.css"
import { useEffect } from "react";
import { getCashTransfersThunk } from "../../store/transfer";
import { calculateBuyingPower } from "../../utils/CalculationFunctions";

function DashboardPage() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const transfersArr = Object.values(useSelector(state => state.transfers))

  // hydrate redux store's cash trasnfers slice
  useEffect(()=> {
    dispatch(getCashTransfersThunk())
  },[])

  // if user has not logged in, back to landing page
  if (!sessionUser) return <Redirect to="/" />;

  return (

    <div className="dashboard-page-container">
      <div className="dashboard-left-container">
        <img
        src="https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/04a63fd4f116951d91ad9b6037b42ee1.svg"
        className="dashboard-header-pic"
        />
        <h1 className="welcome-message">Welcome to Arrow Investment</h1>
      </div>
      <div className="buying-power-container">
        <div className="buying-power-text">Buying Power</div>
        <div className="buying-power-amount">{calculateBuyingPower(transfersArr)}</div>
      </div>


      <div className="dashboard-right-container">
        <Watchlists />
      </div>
    </div>


  )
}

export default DashboardPage
