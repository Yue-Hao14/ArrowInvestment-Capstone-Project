import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import AccountButton from './AccountButton';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	return (
		<nav className='navigation-container'>
			<NavLink exact to='/dashboard' className='navigation-logo'>
				Arrow Investment
				<i className="fa-solid fa-arrow-trend-up navlogo"></i>
			</NavLink>
			{isLoaded && !sessionUser && (
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
			{isLoaded && sessionUser && (
				<div className='navigation-right-container'>
					<AccountButton user={sessionUser} />
				</div>
			)

			}
		</nav >
	);
}

export default Navigation;
