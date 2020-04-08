import React from 'react';
import Login from './login';
import Register from './register';
import {BrowserRouter,Route} from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<Route path='/login' component={Login} />
			<Route path='/register' component={Register} />
		</BrowserRouter>
	);
}

export default App;
