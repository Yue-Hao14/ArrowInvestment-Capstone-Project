import { useEffect, useState } from "react";
import { fetchStockNews } from "../../utils/FetchStockData";

function News({ ticker }) {
  const [newsArr, setNewsArr] = useState([])

  // fetch news from polygon
  useEffect(() => {
    async function fetchNewsForDashboard() {
      const data = await fetchStockNews(ticker)
      // console.log(data)
      setNewsArr(data.results)
    };
    fetchNewsForDashboard()
  }, [ticker])

  return (
    <>
      <h2 className="news-header">Market News</h2>
      {newsArr.length > 0 &&
        newsArr.map(news => (
          <a key={news.id} href={news.article_url} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
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
              <div className="news-title-tickers-pic-container">
                <div className="news-title-tickers-container">
                  <div className="news-title">{news.title}</div>
                  <div className="news-tickers">{news.tickers.map((ticker) => (<span key={news.tickers.indexOf(ticker)} className={ticker}>{ticker}</span>))}</div>
                </div>
                <img className="news-image" src={news.image_url} alt="news" />
              </div>
            </div>
          </a>
        ))
      }
    </>
  )
}

export default News
