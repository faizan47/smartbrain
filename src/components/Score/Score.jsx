import React from 'react';
import { Component } from 'react';

class Score extends Component {
	render() {
		return (
			<div className="mt5">
				<div className="white f3">{`Hello ${this.props.name}, your current entry count is...`}</div>
				<div className="white f1">{this.props.score}</div>
			</div>
		);
	}
}

export default Score;
