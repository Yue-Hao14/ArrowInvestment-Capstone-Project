import { useEffect, useState } from "react";
import { fetchStockNews } from "../../utils/FetchStockData";

function News({ ticker }) {
  const [newsArr, setNewsArr] = useState([])

  // fetch news from polygon
  useEffect(() => {
    async function fetchNewsForDashboard() {
      const data = await fetchStockNews()
      // console.log(data)
      setNewsArr(data.results)
    };
    fetchNewsForDashboard()
  }, [])

  return (
    <>
      <h3 className="news-header">Market News</h3>
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
              <div className="news-title-pic-container">
                <div className="news-title">{news.title}</div>
                <img className="news-image" src={news.image_url} />
              </div>
            </div>
          </a>
        ))
      }
    </>
  )
}

export default News
