import React,{ Component } from 'react';
import {Link} from 'react-router-dom';

export default class Login extends Component {

	state = { 
		username : '',
		password : ''
	}
	
	handleInputChange = e => {
		const { value } = e.target;
		if (e.target.name === 'usr') {
			this.setState({ username : value});
		}
		else /* name is 'pass' */ {
			this.setState({ password : value});
		}
	
	}

	componentDidMount() {
		// test if session is active
		console.log('mounted with token: ' + localStorage.getItem('token'));
	}

	handleSubmit = e => {
		
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state)
		};
		
		e.preventDefault();
		fetch('http://localhost:8080/login/',options)
			.then(response => response.json())
			.then(data => {
				const { token } = data;
				if (token) {
					localStorage.setItem('token',token);
					window.location.replace('http://localhost:3000/');	
				}
				else console.log('Wrong Credentials');
				
			})
			.catch(error => console.log('caught:' + error));
	
	}

	render() { 
		return (
			<div className='login-container'>
				<form className="text-center border border-light p-5" onSubmit={this.handleSubmit} >
					<p className="h4 mb-4">Welcome</p>

					<input type="text" name="usr" autoComplete="false" className="form-control mb-4" placeholder="Username" onChange={this.handleInputChange} />
					<input type="password" name="pass" className="form-control mb-4" placeholder="Password" onChange={this.handleInputChange} />
        
					<button className="btn btn-info btn-block my-4" type="submit">Login</button>
                
					<p>Not a member?
						<Link to={'/register'}> Register</Link>
					</p>
					<hr/>
				</form>
			</div>
		);
	}
}
