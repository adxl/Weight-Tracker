import React,{ Component } from 'react';

class Home extends Component {

	state = {
		user: {
			name: '',
			entries: []
		},
		value: 0
	}

	componentDidMount() {
		this.fetchUser();
	}

	async fetchUser() {
		let response = await fetch('http://localhost:8080/u/',{
			headers: {
				Authorization: localStorage.getItem('token')
			}
		});
		let data = await response.json();
		this.setState({ user: data });
	}

	logout = () => {
		localStorage.removeItem('token');
		window.location.replace('http://localhost:3000/login');
	}

	handleInputChange = e => {
		const {value} = e.target;
		this.setState({value});
	}

	addEntry = e => {
		const value = {
			value: this.state.value
		};

		fetch('http://localhost:8080/u/e/new/',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('token')
			},
			body: JSON.stringify(value) 
		})
			.then(this.fetchUser())
			.then(console.log(this.state.user.entries.length))
			.catch(error => console.log(error));
	
	}

	render() { 
		return (
			<React.Fragment>
				<button onClick={this.logout}>Log out</button>
				<h1>Welcome home, {this.state.user.name}.</h1>
				<div>
					<label>Enter weight</label>
					<input type="text" onChange={this.handleInputChange} />
					{this.state.value > 0 && <button onClick={this.addEntry}>Add</button>}
				</div>
				<div>
					{this.state.user.entries.length > 0 && this.state.user.entries.map((entry,i) => <li key={i}>{entry.date}: {entry.value}Kg</li>)}
				</div>
			</React.Fragment>);
	}
}
 
export default Home;