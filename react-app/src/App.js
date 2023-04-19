import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import StockPage from "./components/StockPage";
import SplashPage from "./components/SplashPage";
import WatchlistManagePage from "./components/Watchlists/WatchlistManagePage";
import DashboardPage from "./components/Dashboard";
import TransferPage from "./components/TransferPage";
import PageNotFount from "./components/404Page";



function App() {
  const dispatch = useDispatch();
  const location = useLocation()
  const sessionUser = useSelector(state => state.session.user)
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
          <Route exact path="/login" > <LoginFormPage /> </Route>
          <Route exact path="/signup"> <SignupFormPage /> </Route>
          <Route exact path="/dashboard"> <DashboardPage /> </Route>
          <Route exact path="/watchlists/:watchlistId"> <WatchlistManagePage /> </Route>
          <Route exact path="/stocks/:ticker"> <StockPage /> </Route>
          <Route exact path="/transfers"> <TransferPage /> </Route>
          <Route path="*"> <PageNotFount /></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
