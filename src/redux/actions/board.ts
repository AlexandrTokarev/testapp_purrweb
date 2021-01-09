
import { IActionType } from '../types';
import {Column} from "../reducers/column";

export const ADD_COLUMN = 'ADD_COLUMN';
export const DELETE_COLUMN = 'DELETE_COLUMN';
export const MOVE_COLUMN = 'MOVE_COLUMN';

export const addColumn = (column: Column): IActionType => {
	return {
		type: ADD_COLUMN,
		payload: column
	}
}

export const moveColumn = () => {

}