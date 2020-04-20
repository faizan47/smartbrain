import React, { Fragment } from 'react';
import { Component } from 'react';

class Score extends Component {
	constructor(props) {
		super();
		this.state = {
			score: 0
		};
	}
	render() {
		return (
			<div className="mt5">
				<div className="white f3">{`Hello, your current entry count is...`}</div>
				<div className="white f1">{this.state.score}</div>
			</div>
		);
	}
}

export default Score;
