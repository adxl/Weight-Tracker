import React,{ Component,Fragment } from 'react';
import {Link} from 'react-router-dom';

export default class Login extends Component {

	state = {  }
	
	render() { 
		return (
			<div className='login-container'>
				<form className="text-center border border-light p-5" action="#!">
					<p className="h4 mb-4">Welcome</p>

					<input type="email" className="form-control mb-4" placeholder="E-mail"/>
					<input type="password" className="form-control mb-4" placeholder="Password"/>
        
					<button className="btn btn-info btn-block my-4" type="submit">Login</button>
                
					<p>Not a member?
						<Link to={'/register'}> Register</Link>
					</p>
				</form>
			</div>
		);
	}
}
