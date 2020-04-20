import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
	return (
		<Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }}>
			<div className="Tilt-inner pointer pa3">
				<img style={{ paddingTop: '5px' }} alt="logo" src={brain} />
			</div>
		</Tilt>
	);
};
// { onRouteChange } onClick={() => onRouteChange('login')}
export default Logo;
