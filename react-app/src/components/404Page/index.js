import pageNotFound from './page-not-found.svg'
import "./404Page.css"
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function PageNotFound() {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  const handleGoHome = () => {
    if (sessionUser) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  };


  return (
    <div className="pageNotFound">
      <div className="pageNotFound-left-container">
        <div>404</div>
        <div>Page Not Found</div>
        <p>Not all those who wander are lost, but it seems you may have taken a wrong turn.</p>
        <button onClick={handleGoHome}>Go Home</button>
      </div>

      <div className="pageNotFound-right-container">
        <img src={pageNotFound} alt="404" />
      </div>
    </div>
  );
}

export default PageNotFound;
