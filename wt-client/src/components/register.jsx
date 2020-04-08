import React,{ Component } from 'react';
import {Link} from 'react-router-dom';

export default class Register extends Component {

	state = {  }
	
	render() { 
		return (
			<div className='register-container'>
				<form className="text-center border border-light p-5">
					<p className="h4 mb-4">Sign up</p>

					<input type="text" className="form-control mb-4" placeholder="Name"/>
    
					<input type="email" className="form-control mb-4" placeholder="E-mail"/>
    
					<input type="password" className="form-control" placeholder="Password"/>
    
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
