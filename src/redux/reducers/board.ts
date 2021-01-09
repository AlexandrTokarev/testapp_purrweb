import { IActionType } from '../types';
import {ADD_COLUMN, DELETE_COLUMN, MOVE_COLUMN} from "../actions/board";
import {Column} from "./column";

export type IBoardState = Array<Column>

const initialState: IBoardState = [
	{
		id: '123',
		title: 'Test 1',
		created: new Date().toISOString(),
		updated: new Date().toISOString(),
		cards: []
	},
	{
		id: '12345',
		title: 'Test 2',
		created: new Date().toISOString(),
		updated: new Date().toISOString(),
		cards: []
	}
]

const reducer = (state = initialState, action: IActionType): IBoardState => {
	switch (action.type) {
		case ADD_COLUMN:
			return [...state, action.payload];
		case DELETE_COLUMN:
			return state.filter(column => column.id !== action.payload);
		case MOVE_COLUMN: {
			const { oldIndex, newIndex } = action.payload;
			const newLists = Array.from(state);
			const [removedList] = newLists.splice(oldIndex, 1);
			newLists.splice(newIndex, 0, removedList);
			return newLists;
		}
		default:
			return state;
	}
}

export default reducer;