import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    console.log(data)
    if (data) {
      setErrors(data);
    } else {
      history.push('/dashboard')
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();

    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
      history.push('/dashboard')
    }
  }

  return (
    <div className="login-page-container">
      <div className="login-pic-container">
        <img
          src="https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/632fcb3e7ed928b2a960f3e003d10b44.jpg"
          alt="login image" />
      </div>
      <div className="'login-right-container">
        <div className="login-title">Log in to Arrow Investment</div>
        <form onSubmit={handleSubmit} className="login-form">
          <ul>
            {errors && errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
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
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="login-button-container">
            <button type="submit" className="login-page-button">Log In</button>
            <button onClick={demoLogin} className="login-demo-button">Demo Login</button>
          </div>
        </form>
        <div className="login-redirect-to-signup-container">
          <div>
              Not on Arrow Investment?
              <NavLink to="/signup"> Create an account</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
