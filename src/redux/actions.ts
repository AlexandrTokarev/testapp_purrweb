
import { ADD_TASK, IActionType } from './types';

export const addTask = (task: any): IActionType => {
	return {
		type: ADD_TASK,
		payload: task
	}
}