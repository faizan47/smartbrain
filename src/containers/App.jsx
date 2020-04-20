import React, { Component, Fragment } from 'react';
import './App.css';
import Logo from '../components/Logo/Logo.jsx';
import Navigation from '../components/Navigation/Navigation.jsx';
import Score from '../components/Score/Score.jsx';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import FacePicture from '../components/FaceRecognition/FacePicture';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const Clarifai_API_KEY = process.env.REACT_APP_CLARIFAI_API_KEY;

const app = new Clarifai.App({
	apiKey: Clarifai_API_KEY
});

const model = 'a403429f2ddf4b49b307e318f00e528b';

const particlesOptions = {
	particles: {
		number: {
			value: 60,
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
			boxes: {},
			route: 'login',
			isLoggedIn: false,
			user: {}
		};
	}
	loadUser = async (data) => {
		this.setState({
			user: {
				id: data[0].id,
				name: data[0].name,
				email: data[0].email,
				score: data[0].score,
				joined: data[0].joined
			},
			isLoggedIn: true
		});
	};

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
			this.setState({ faceCount: response.length });
			for (let res of response) {
				this.generateFaceStyles(res.region_info.bounding_box);
			}
			await fetch('http://localhost:3001/update-score', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: this.state.user.id,
					score: response.length
				})
			});
			this.setState({
				user: { ...this.state.user, score: response.length + Number(this.state.user.score) }
			});
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
	onRouteChange = (route) => {
		if (route === 'home') {
			this.setState({ isLoggedIn: true });
		} else if (route === 'logout') {
			this.setState({ isLoggedIn: false });
		}
		this.setState({ route });
	};
	render() {
		const AuthFlow = () => {
			if (this.state.route === 'login' || this.state.route === 'logout') {
				return <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange} />;
			} else if (this.state.route === 'register') {
				return <Register onRouteChange={this.onRouteChange} />;
			} else {
				return (
					<Fragment>
						<Score score={this.state.user.score} name={this.state.user.name} />
						<FaceRecognition onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
						<FacePicture boxes={this.state.boxes} picture={this.state.imageUrl} />
					</Fragment>
				);
			}
		};
		return (
			<div className="App">
				<Particles className="particles" params={particlesOptions} />
				<header className="mt2">
					<Logo onRouteChange={this.onRouteChange} />
					<Navigation onRouteChange={this.onRouteChange} isLoggedIn={this.state.isLoggedIn} />
				</header>
				{AuthFlow()}
			</div>
		);
	}
}

export default App;
