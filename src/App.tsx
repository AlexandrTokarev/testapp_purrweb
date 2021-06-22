import React, { useState } from 'react';
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import Board from './components/Board/Board';
import { userService } from './services/currentUser';

function App() {
	const [showModal, setShowModal] = useState<boolean>(() => {
		return !userService.isAuth()
	})

	return (
		<div className='app'>
			<Header />
			<Register show={showModal} close={() => setShowModal(false)} />
			{userService.isAuth() && <Board />}
		</div>
	);
}

export default App;
