import React from 'react';
import Header from './components/Header/Header';
import Register from './components/Register/Register';

function App() {
	return (
		<div className='app'>
			<Header />
			<Register
				show={true}
			/>
			<div className='container'>
				<h1>Hello</h1>
			</div>
		</div>
	);
}

export default App;
