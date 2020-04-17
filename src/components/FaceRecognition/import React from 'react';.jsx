import React, { Fragment } from 'react';

let boxesArr = [];
const FacePicture = ({ picture, boxes }) => {
	console.log(boxes);
	if (boxes.style) {
		const box = (
			<div key={Math.random()} className="bounding-box-set">
				<div key={Math.random()} className="bounding-box" style={boxes} />
			</div>
		);
		boxesArr.push(box);
	}

	return (
		<Fragment>
			<div className="image-view mt-4">
				<img id="image" alt="" src={picture} />
			</div>
			<div className="bounding-box-container">
				<div className="bounding-boxes">{[ ...boxesArr ]}</div>
			</div>
		</Fragment>
	);
};

export default FacePicture;
