import React, { Component, Fragment } from 'react';

class Navigation extends Component {
	onLogout = async () => {
		try {
			const response = await fetch('http://localhost:3001/signout', {
				method: 'post'
			});
			if (response.status === 200) this.props.onRouteChange('logout');
		} catch (error) {
			console.log(error);
		}
	};
	render() {
		const { onRouteChange, isLoggedIn } = this.props;
		return (
			<nav>
				{isLoggedIn ? (
					<p onClick={this.onLogout} className="f3 link dim black underline pa3 pointer">
						Sign Out
					</p>
				) : (
					<Fragment>
						<p onClick={() => onRouteChange('login')} className="f3 link dim black underline pa3 pointer">
							Sign In
						</p>
						<p
							onClick={() => onRouteChange('register')}
							className="f3 link dim black underline pa3 pointer"
						>
							Sign Up
						</p>
					</Fragment>
				)}
			</nav>
		);
	}
}

export default Navigation;
