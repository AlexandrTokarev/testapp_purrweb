
import { IUserState } from './reducers/user';
import { IBoardState } from './reducers/board';

export interface IActionType {
	type: string,
	payload: any
}

export interface IAppState {
	user: IUserState,
	board: IBoardState
}

