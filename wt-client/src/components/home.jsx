import React,{ Component } from 'react';
import Chart from './chart';

class Home extends Component {

	state = {
		user: null,
		value: '',
		date: '',
		today: '',
		url: 'noUrl'
	}

	componentDidMount() {
		this.fetchUser();
		this.setDate();
	}

	async fetchUser() {
		await fetch('http://localhost:8080/u/',{
			headers: {
				Authorization: localStorage.getItem('token')
			}
		})
			.then(response => response.json())
			.then(data => {
				this.setState({ user: data });
				this.prepareData(JSON.stringify(data.entries));
			})
			.catch(error => console.log('Oops: \n' + error));
	}

	logout = () => {
		localStorage.removeItem('token');
		window.location.replace('http://localhost:3000/login');
	}

	handleInputChange = e => {
		this.setState({ value: e.target.value });
	}
	
	handleDateChange = e => {
		this.setState({ date: e.target.value });
	}

	addEntry = () => {
		const body = {
			value: this.state.value,
			date: this.state.date
		};

		fetch('http://localhost:8080/u/e/new/',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token')
			},
			body: JSON.stringify(body) 
		})
			.then(async fun => await this.fetchUser())
			.then(() => {
				this.setState({value: ''});
			})
			.catch(error => console.log(error));
	}

	deleteEntry = entry => {
		fetch('http://localhost:8080/u/e/delete/',{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token')
			},
			body: JSON.stringify(entry)
		})
			.then(async fun => await this.fetchUser())
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

	prepareData = data => {
		const file = new Blob([data],{ type: 'json' });
		const url = URL.createObjectURL(file);

		this.setState({url});
	}

	setDate = () => {
		if (this.state.date)
			return this.state.day;
		
		const date = new Date();
		let day = date.getDate();
		if (day < 10) 
			day = '0' + day;
		
		let month = date.getMonth() + 1;
		if (month < 10) 
			month = '0' + month;
		
		const year = date.getFullYear();

		const today = year + '-' + month + '-' + day;
		this.setState({date: today,today});
	}

	render() { 
		const { user } = this.state;
		let entries;
		if (user !== null && user.entries.length > 0) {
			entries = [...user.entries];
			entries.reverse();
		}

		return (
			<React.Fragment>
				<nav className="navbar navbar-dark bg-dark">
					<span className="navbar-brand mb-0 h1">Navbar</span>
					<button onClick={this.logout}>Log out</button>
				</nav>
				<div className="container">
					<h1>Welcome home, {this.state.user !== null && this.state.user.name}.</h1>
					
					<div className="data-container">
						<div>
							<label>Enter weight</label>
							<input type="text" value={this.state.value} onChange={this.handleInputChange} />
							<input type="date" value={this.state.date} max={this.state.today} onChange={this.handleDateChange} />
							{this.state.value > 0 && <button onClick={this.addEntry}>Add</button>}
						</div>
						
						<div>
							<ol>
								{entries && entries.length > 0 && entries.map((entry,i) =>
									<li key={i}>
										{entry.date.toString().substring(0,10)}: {entry.value}Kg
										<button onClick={() => this.deleteEntry(entry)}>Delete</button>
									</li>
								)}
							</ol>
						
						</div>
						<button onClick={this.clearEntries} >Clear all</button>
						<button onClick={this.saveData} >
							<a download="entries.json" href={this.state.url}>Save data</a>
						</button>
						
					</div>
					<div className="chart-container">
						{this.state.user && <Chart data={this.state.user.entries} />}
					</div>
				</div>

			</React.Fragment>);
	}
}
 
export default Home;