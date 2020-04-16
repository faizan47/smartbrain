import React from 'react';

let boxesArr = [];
const FacePicture = ({ picture, boxes }) => {
	const box = <div key={Math.random()} className="bounding-box" style={boxes} />;
	boxesArr.push(box);

	return (
		<div className="center ma">
			<div className="absolute mt2">
				<img id="image" alt="" src={picture} />
			</div>
			<div className="bounding-box-container"> {[ ...boxesArr ]}</div>
		</div>
	);
};

export default FacePicture;
