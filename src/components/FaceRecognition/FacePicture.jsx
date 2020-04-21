import React from 'react';

let boxesArr = [];
const FacePicture = ({ picture, boxes }) => {
	if (boxes && boxes.inset) {
		const box = <div key={Math.random()} className="bounding-box" style={boxes} />;
		boxesArr.push(box);
	} else {
		boxesArr = [];
	}

	return (
		<div className="image-wrapper mt3">
			<div className="image-container">
				<img id="image" alt="" src={picture} />
			</div>
			<div className="bounding-box-container"> {[ ...boxesArr ]}</div>
		</div>
	);
};

export default FacePicture;
