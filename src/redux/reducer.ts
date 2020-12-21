import { ADD_TASK, IActionType } from './types';

export interface IAppState {
	userName: string | null,
	board: Array<any>
}

const initialState: IAppState = {
	userName: null,
	board: [
		
	]
}

const reducer = (state = initialState, action: IActionType): IAppState => {
	switch (action.type) {
		case ADD_TASK:
			return state
		default:
			return state;;
	}
}

export default reducer;