import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import AccountButton from './AccountButton';
import { fetchAllTickers } from '../../utils/FetchStockData';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	const [stocksArr, setStocksArr] = useState()
	const [filteredData, setFilteredData] = useState([])
	const [searchStock, setSearchStock] = useState("")

	const siteClassName = "sitename" + (sessionUser ? " hidden" : "");

	const comingSoon = (e) => {
		e.preventDefault();
		alert("Feature coming soon...")
	}

	// fetch the list of available stocks from polygon
	useEffect(() => {
		async function fetchTickersForSearchBar() {
			const data = await fetchAllTickers()
			// console.log("data.results in Navigation", data)
			setStocksArr(data.results)
		};
		fetchTickersForSearchBar()
	}, [])

	// function that takes user input and filter through all the stocks,
	// return an array with tickers includes user's input
	// set this array to filteredData so can be passed on to JSX
	const handleFilter = (e) => {
		e.preventDefault();

		let searchStock = e.target.value
		setSearchStock(searchStock)

		let filteredStocksArr;
		if (stocksArr) {
			filteredStocksArr = stocksArr.filter(stock => {
				return stock.T.toUpperCase().startsWith(searchStock.toUpperCase())
			})
		}

		if (searchStock === "") {
			setFilteredData([]);
		} else {
			setFilteredData(filteredStocksArr)
		}
	}
// console.log("searchStock", searchStock)
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
				<>
					<div className='navigation-search-bar-container'>
						<div className='navigation-search-bar-inputs'>
							<i className="fa-solid fa-magnifying-glass search-icon"></i>
							<input type="text" placeholder='Search' value={searchStock} onChange={handleFilter} />
						</div>
						{filteredData.length !== 0 && searchStock.length !== 0 && (
							<div className='navigation-search-bar-results'>
								{filteredData.slice(0, 5).map(stock => (
									<NavLink
										to={`/stocks/${stock.T}`}
										className="navigation-search-bar-results-items"
										onClick={()=> setSearchStock("")}>
										<span className='navigation-search-bar-results-items-ticker'>{stock.T}</span>
										{/* <span className='navigation-search-bar-results-items-name'>{stock.name}</span> */}
									</NavLink>
								))}
							</div>
						)}

					</div>
					<div className='navigation-right-container-logged-in'>
						<button className='rewards button' onClick={comingSoon}>Rewards</button>
						<NavLink to="/dashboard" className="investing-button">Investing</NavLink>
						<button className='spending button' onClick={comingSoon}>Spending</button>
						<button className='retirement button' onClick={comingSoon}>Retirement</button>
						<button className='notification button' onClick={comingSoon}>Notification</button>
						<AccountButton user={sessionUser} className="account-button" />
					</div>
				</>
			)

			}
		</nav >
	);
}

export default Navigation;
