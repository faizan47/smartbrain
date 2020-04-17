import React, { Component } from 'react';
import './App.css';
import Logo from '../components/Logo/Logo.jsx';
import Navigation from '../components/Navigation/Navigation.jsx';
import Score from '../components/Score/Score.jsx';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import FacePicture from '../components/FaceRecognition/FacePicture';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
	apiKey: 'YOUR_API_KEY'
});

const model = 'a403429f2ddf4b49b307e318f00e528b';

const particlesOptions = {
	particles: {
		number: {
			value: 15,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			boxes: {}
		};
	}

	onInputChange = (e) => {
		this.setState({ imageUrl: e.target.value });
	};

	onSubmit = async () => {
		await this.sendImage();
	};

	sendImage = async () => {
		try {
			const data = await app.models.predict(model, this.state.imageUrl);
			const response = data.outputs[0].data.regions;
			for (let res of response) {
				this.generateFaceStyles(res.region_info.bounding_box);
			}
		} catch (error) {
			console.log(error, 'error');
		}
	};

	generateFaceStyles = (data) => {
		const { top_row, bottom_row, left_col, right_col } = data;
		const image = document.querySelector('#image');
		const height = image.height;
		const width = image.width;
		const style = {
			inset: `${top_row * height}px ${width - right_col * width}px ${height - bottom_row * height}px ${left_col *
				width}px`
		};
		this.setState({ boxes: style });
	};

	render() {
		return (
			<div className="App">
				<Particles className="particles" params={particlesOptions} />
				<header className="mt2">
					<Logo />
					<Navigation />
				</header>
				<Score />
				<FaceRecognition onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
				<FacePicture boxes={this.state.boxes} picture={this.state.imageUrl} />
			</div>
		);
	}
}

export default App;
