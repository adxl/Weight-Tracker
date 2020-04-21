import React,{ Component } from 'react';
import Chart from './chart';

// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
					<span className="navbar-brand mb-0 h1">Weight-Tracker</span>
					<button className="btn btn-light" onClick={this.logout}>Log out</button>
				</nav>
				<div className="main-container">
					
					<div className="data-container">
						<div>
							<input className="ml-4" type="number" min="0" placeholder="Enter weight" value={this.state.value} onChange={this.handleInputChange} />
							<br/>
							<input className="ml-4 mt-2" type="date" value={this.state.date} max={this.state.today} onChange={this.handleDateChange} />
							{this.state.value > 0 && <button className="btn btn-primary ml-3" onClick={this.addEntry}>Add</button>}
						</div>
						{entries && entries.length > 0 && 
						<div>
							<div className="entries ml-3 mt-3">
								<ul>
									{entries.map((entry,i) =>
										<li key={i}>
											{entry.date.toString().substring(0,10)}: {entry.value}Kg
											<button className="delete-btn btn btn-danger ml-2 p-1" onClick={() => this.deleteEntry(entry)}>
												<FontAwesomeIcon icon={faTrash} size="1x" />
											</button>
										</li>
									)}
								</ul>
							
							</div>
							 <div className="btns">
								<button className="btn btn-danger mr-2 p-1" onClick={this.clearEntries} >Clear all</button>
								<button className="btn btn-info p-1" onClick={this.saveData} >
									<a download="entries.json" href={this.state.url}>Save data</a>
								</button>
							</div>
						</div>
						}
						
					</div>
					<div className="chart-container">
						{this.state.user && <Chart data={this.state.user.entries} />}
					</div>
				</div>

			</React.Fragment>);
	}
}
 
export default Home;