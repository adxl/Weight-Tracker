import React,{ Component } from 'react';

class Home extends Component {

	state = {
		user: null,
		value: null
	}

	componentDidMount() {
		this.fetchUser();
	}

	async fetchUser() {
		await fetch('http://localhost:8080/u/',{
			headers: {
				Authorization: localStorage.getItem('token')
			}
		})
			.then(response => response.json())
			.then(data => this.setState({user: data},this.render))
			.catch(error => console.log('Oops: \n' + error));
	}

	logout = () => {
		localStorage.removeItem('token');
		window.location.replace('http://localhost:3000/login');
	}

	handleInputChange = e => {
		const {value} = e.target;
		this.setState({value});
	}

	addEntry = () => {
		const value = {
			value: this.state.value
		};

		fetch('http://localhost:8080/u/e/new/',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token')
			},
			body: JSON.stringify(value) 
		})
			.then(async fun => await this.fetchUser())
			.then(console.log(this.state.user.entries.length))
			.catch(error => console.log(error));
	}

	clearEntries = () => {
		fetch('http://localhost:8080/u/e/clear/',{
			method: 'DELETE',
			headers: {
				Authorization:localStorage.getItem('token')
			}
		})
			.then(async fun => await this.fetchUser())
			.catch(error => console.log(error));
	}

	render() { 
		const { user } = this.state;
		let entries;
		if (user !== null && user.entries.length > 0) {
			entries = user.entries;
			entries.reverse();
		}
		return (
			<React.Fragment>
				<button onClick={this.logout}>Log out</button>
				<h1>Welcome home, {this.state.user !== null && this.state.user.name}.</h1>
				<div>
					<label>Enter weight</label>
					<input type="text" onChange={this.handleInputChange} />
					{this.state.value > 0 && <button onClick={this.addEntry}>Add</button>}
				</div>
				<div>
					<ul>
						{entries && entries.length > 0 && user.entries.map((entry,i) =>
							<li key={i}>
								{entry.date.toString().substring(11,/*10*/19)}: {entry.value}Kg
								<button>Edit</button>
								<button>Delete</button>
							</li>
						)}
					</ul>
				</div>
				<button onClick={this.clearEntries} >Clear all</button>
			</React.Fragment>);
	}
}
 
export default Home;