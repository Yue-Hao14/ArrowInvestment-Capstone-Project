import { useParams } from "react-router-dom"

function WatchlistDetailsPage() {
  const { watchlistId } = useParams()

  return (
    <h1>Welcome to watchlist {watchlistId} detail page</h1>
  )
}

export default WatchlistDetailsPage
