import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<nav className='navigation-container'>
			<NavLink exact to='/' className='navigation-logo'>
				Arrow Investment
				<i className="fa-solid fa-arrow-trend-up navlogo"></i>
			</NavLink>
			{isLoaded && (
				<ProfileButton user={sessionUser} />
			)}
		</nav >
	);
}

export default Navigation;
