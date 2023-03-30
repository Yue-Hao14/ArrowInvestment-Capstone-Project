import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import AccountButton from './AccountButton';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	const siteClassName = "sitename" + (sessionUser ? " hidden" : "");

	const comingSoon = (e) => {
		e.preventDefault();
		alert("Feature coming soon...")
	}

	return (
		<nav className='navigation-container'>
			<NavLink exact to='/dashboard' className='navigation-logo'>
				<div className={siteClassName}>Arrow Investment</div>
				<img src="https://cdn-icons-png.flaticon.com/512/3458/3458992.png" className='navlogo' />
			</NavLink>
			{!sessionUser && (
				<div className='navigation-right-container'>
					<button
						className='login-button'
						id='login'
						onClick={() => history.push("/login")}
					>
						Log in
					</button>
					<button
						className='signup-button'
						id='signup'
						onClick={() => history.push("/signup")}
					>
						Sign up
					</button>
				</div>
			)}
			{sessionUser && (
				<div className='navigation-right-container'>
					<button className='rewards-button' onClick={comingSoon}>Rewards</button>
					<NavLink to="/dashboard" className="investing-button">Investing</NavLink>
					<button className='spending-button' onClick={comingSoon}>Spending</button>
					<button className='retirement-button' onClick={comingSoon}>Retirement</button>
					<button className='notification-button' onClick={comingSoon}>Notification</button>
					<AccountButton user={sessionUser} className="account-button" />
				</div>
			)

			}
		</nav >
	);
}

export default Navigation;
