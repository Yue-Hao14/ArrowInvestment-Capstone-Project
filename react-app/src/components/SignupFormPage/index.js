import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import { createPortfolioThunk } from "../../store/portfolio";
import './SignupForm.css';
import { resetWatchlist } from "../../store/watchlist";


function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  // error handling
  useEffect(() => {
    let validationErrors = []
    if (!email.includes("@")) validationErrors.push('Please enter a valid email address')
    if (password.length < 8 || password.length > 20) validationErrors.push("Passsword needs to be between 8 and 20 characters.")
    if (password !== confirmPassword) validationErrors.push('Confirm Password field must be the same as the Password field')
    setErrors(validationErrors)
  }, [email, password, confirmPassword])

  if (sessionUser) return <Redirect to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoaded(true)
    // console.log(errors)
    if (errors.length === 0) {
      const data = await dispatch(signUp(username, firstName, lastName, email, password))
        .then(() => dispatch(createPortfolioThunk())
          .then(() => dispatch(resetWatchlist())))

      if (data) {
        setErrors(data)
      } else {
        history.push('/dashboard')
      }
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-left-container">
        <div className="signup-left-top-container">
          <div className="sign-up-sitename">
            Arrow Investment
            <img src="https://cdn-icons-png.flaticon.com/512/3458/3458992.png" className='navlogo' alt="logo" />
          </div>
          <div className="signup-title">Create your login</div>
          <span className="signup-message">We'll need your email address, username, first name, last name and a unique password. You'll use this login to access Arrow Investment next time.</span>
        </div>
        <img
          src="https://cdn.robinhood.com/app_assets/odyssey/rockets.png"
          alt="signup"
          className="signup-pic" />
      </div>
      <div className="signup-right-container">
        <div className="signup-right-title">Enter your first and last name as they appear on your government ID.</div>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-error-messages-container">
            {isLoaded && errors?.map((error, idx) => <li key={idx}>{error}</li>)}
          </div>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="signup-page-button">Sign Up</button>
        </form>
        <div className="signup-redirect-to-login-container">
          Already started?
          <NavLink to="/login"> Log in here</NavLink>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
