import { IActionType } from '../types'
import { LOGIN, LOGOUT } from '../actions/user';

export interface IUserState {
	name: string | null,
}

const initialState: IUserState = {
	name: null
}

const reducer = (state: IUserState = initialState, { type, payload}: IActionType):IUserState => {

	switch (type) {
		case LOGIN:
			return { name: payload };
		case LOGOUT:
			return { name: null }
	
		default:
			return state;
	}
};

export default reducer;