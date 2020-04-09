import React,{ Component } from 'react';
import {Link} from 'react-router-dom';

export default class Register extends Component {

	state = { 
		username: '',
		password: '',
		name: ''
	}

	handleInputChange = e => {
		// console.log(e.target.id + ': ' + e.target.value);
		const { id } = e.target;
		const { value } = e.target;

		switch (id) {
		case 'name':
			this.setState({name: value});
			break;
		case 'username':
			this.setState({ username: value });
			break;
		case 'password':
			this.setState({ password: value});
			break;
		}
	} 

	handleSubmit = e => {
		e.preventDefault();
		
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state)
		};
		
		fetch('http://localhost:8080/register/',options)
			.then(data => {
				if (data.ok)
					window.location.replace('http://localhost:3000/login');
			})
			.catch(error => console.log('caught:' + error));
	}

	render() { 
		return (
			<div className='register-container'>
				<form className="text-center border border-light p-5" onSubmit={this.handleSubmit} >
					<p className="h4 mb-4">Sign up</p>

					<input type="text" id="name" className="form-control mb-4" placeholder="Name" onChange={this.handleInputChange} />
    
					<hr/>

					<input type="text" id="username" className="form-control mb-4" placeholder="Username" onChange={this.handleInputChange} />
    
					<input type="password" id="password" className="form-control" placeholder="Password" onChange={this.handleInputChange} />
    
					<button className="btn btn-info my-4 btn-block" type="submit">Create an account</button>

					<p>Have an account?
						<Link to={'/login'}> Login</Link>
					</p>
					<hr/>
				</form> 
			</div>
		);
	}
}
