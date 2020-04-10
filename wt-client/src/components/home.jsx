import React,{ Component } from 'react';

class Home extends Component {
	state = { 

	}

	componentDidMount() {
		console.log(localStorage.getItem('token'));
			
	}

	logout = () => {
		localStorage.removeItem('token');
		window.location.replace('http://localhost:3000/login');
	}

	render() { 
		return (
			<React.Fragment>
				<h1>WELCOME HOME</h1>
				<button onClick={this.logout} >Log out</button>
			</React.Fragment>);
	}
}
 
export default Home;