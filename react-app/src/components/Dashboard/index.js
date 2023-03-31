import Watchlists from "../Watchlists"
import "./Dashboard.css"

function DashboardPage() {
  return (

    <div className="dashboard-page-container">
      <div className="dashboard-left-container">
        <img
        src="https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/04a63fd4f116951d91ad9b6037b42ee1.svg"
        className="dashboard-header-pic"
        />
        <h1 className="welcome-message">Welcome to Arrow Investment</h1>
      </div>
      <div className="dashboard-right-container">
        <Watchlists />
      </div>
    </div>


  )
}

export default DashboardPage
