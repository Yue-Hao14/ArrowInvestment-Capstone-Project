import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";

function AccountButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  // close menu whenever user click on anywhere else on the webpage
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleInvesting = (e) => {
    e.preventDefault();
    history.push('/dashboard')
  }

  const handleTransfers = (e) => {
    e.preventDefault();
    history.push('/transfers')
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu} className="account-button">Account</button>
      <div className={ulClassName} ref={ulRef}>
        {user && (
          <div className="account-dropdown-inner-container">
            <div className="username-row">{user.first_name} {user.last_name}</div>
            <div className="investing-row">
            <i className="fa-solid fa-suitcase"></i>
            <button onClick={handleInvesting} className="investing-button">Investing</button>
            </div>
            <div className="transfers-row">
            <i className="fa-solid fa-building-columns"></i>
            <button onClick={handleTransfers} className="transfers-button">Transfers</button>
            </div>
            <div className="logout-row">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <button onClick={handleLogout} className="logout-button">Log Out</button>
            </div>
          </div>
        )
        }
      </div>
    </>
  )
}

export default AccountButton
