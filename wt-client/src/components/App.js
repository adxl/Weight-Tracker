import React from 'react';
import Home from './home';
import Login from './login';
import Register from './register';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			{/* token: true */}
			<Switch>
				{localStorage.getItem('token') && <Route exact path='/' component={Home} />}
				{localStorage.getItem('token') && <Route path='/*' component={Home} />}
			</Switch>
			
			{/* token: false */}
			<Switch>
				{ !localStorage.getItem('token') &&  <Route exact path='/login' component={Login} />}
				{ !localStorage.getItem('token') && <Route exact path='/register' component={Register} />}
				{ !localStorage.getItem('token') && <Route path='/*' component={Login} /> }
			</Switch>
		</BrowserRouter>
	);
}

export default App;
