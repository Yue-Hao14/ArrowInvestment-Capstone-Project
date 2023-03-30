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
					<NavLink to="/dashboard" className="investing-button">Investing</NavLink>
					<AccountButton user={sessionUser} className="account-button" />
				</div>
			)

			}
		</nav >
	);
}

export default Navigation;
