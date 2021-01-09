import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import Board from './components/Board/Board';
import { IAppState } from './redux/types';
import { IUserState } from './redux/reducers/user';

function App() {
	const user: IUserState = useSelector<IAppState, IUserState>(state => state.user);

	const [showRegister, setShowRegister] = useState<boolean>(!user.name);

	return (
		<div className='app'>
			<Header />
			<Register show={showRegister} close={() => setShowRegister(false)}/>
			{!!user.name && <Board/>}
		</div>
	);
}

export default App;
