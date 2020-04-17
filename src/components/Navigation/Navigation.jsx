import React from 'react';

const Navigation = ({ onRouteChange, isLoggedIn }) => {
	return (
		<nav>
			{isLoggedIn ? (
				<p onClick={() => onRouteChange('logout')} className="f3 link dim black underline pa3 pointer">
					Sign Out
				</p>
			) : (
				<p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa3 pointer">
					Sign Up
				</p>
			)}
		</nav>
	);
};

export default Navigation;
