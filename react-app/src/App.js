import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Watchlists from "./components/Watchlists";
import StockPage from "./components/StockPage";
import SplashPage from "./components/SplashPage";
import WatchlistDetailsPage from "./components/Watchlists/WatchlistDetailsPage";
import DashboardPage from "./components/Dashboard";

function App() {
  const dispatch = useDispatch();
  const location = useLocation()
  const sessionUser = useSelector(state => state.session.user)
  const isLoggedIn = Boolean(sessionUser)
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // hide navigation component on login and signup page
  const showNavigation = location.pathname !== '/login' && location.pathname !== '/signup'

  return (
    <>
      {showNavigation && <Navigation />}
      {isLoaded && (
        <Switch>
          <Route exact path="/"> <SplashPage /> </Route>
          <Route exact path="/login" > {isLoggedIn ? <Redirect to="/dashboard" /> : <LoginFormPage />} </Route>
          <Route exact path="/signup"> {isLoggedIn ? <Redirect to="/dashboard" /> : <SignupFormPage />} </Route>
          <Route path="/dashboard"> {isLoggedIn ? <DashboardPage /> : <Redirect to="/" />}</Route>
          <Route path="/watchlists/:watchlistId"> {isLoggedIn ? <WatchlistDetailsPage /> : <Redirect to="/" />} </Route>
          <Route path="/stocks/:ticker"> {isLoggedIn ? <StockPage /> : <Redirect to="/" />} </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
