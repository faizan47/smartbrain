import React, { Component } from 'react';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userEmail: '',
			userPassword: ''
		};
	}
	onEmailChange = (e) => {
		this.setState({ userEmail: e.target.value });
	};
	onPasswordChange = (e) => {
		this.setState({ userPassword: e.target.value });
	};
	onSignIn = async () => {
		try {
			const response = await fetch('http://localhost:3001/signin', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: this.state.userEmail,
					password: this.state.userPassword
				})
			});
			if (response.status === 200) {
				this.setState({ isLoggedIn: true });
				this.props.onRouteChange('home');
				this.props.loadUser(await response.json());
			}
		} catch (error) {
			this.props.onRouteChange('login');
		}
	};
	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="br2 ba shadow-5  b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Sign In</legend>

							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">
									Email
								</label>
								<input
									onChange={this.onEmailChange}
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email-address"
									id="email-address"
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">
									Password
								</label>
								<input
									onChange={this.onPasswordChange}
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="password"
									name="password"
									id="password"
								/>
							</div>
						</fieldset>
						<div>
							<input
								onClick={this.onSignIn}
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit"
								value="Login"
							/>
						</div>
						<div className="lh-copy mt3 pointer">
							<a onClick={() => onRouteChange('register')} className="f3 link dim black db">
								Register
							</a>
						</div>
					</div>
				</main>
			</article>
		);
	}
}

export default Login;
