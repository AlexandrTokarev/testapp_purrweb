const BOARD_PROPERTY = 'board';

export const boardService = {
	getBoard(): Types.Board {
		const boardStr = localStorage.getItem(BOARD_PROPERTY);

		return typeof boardStr === 'string' ? JSON.parse(boardStr) : { columns: []};
	},
	moveColumn(oldIndex: number, newIndex: number) {
		const board = this.getBoard();
		const newLists = Array.from(board.columns ?? []);
		const [removedList] = newLists.splice(oldIndex, 1);
		newLists.splice(newIndex, 0, removedList);
		board.columns = newLists;
		localStorage.setItem(BOARD_PROPERTY, JSON.stringify(board))
	},
	addColumn(column: Types.Column): void {
		const board = this.getBoard();
		board?.columns.push(column);
		localStorage.setItem(BOARD_PROPERTY, JSON.stringify(board))
	},
	addCardToColumn(columnId: string, card: Types.Card) {
		const board = this.getBoard();
		const targetColumnId = board.columns.findIndex(c => c.id === columnId);
		board.columns[targetColumnId].cards.push(card);
		localStorage.setItem(BOARD_PROPERTY, JSON.stringify(board))
	},
	removeColumn(columnId: string) {
		const board = this.getBoard();
		board.columns = board.columns.filter(c => c.id !== columnId);
		localStorage.setItem(BOARD_PROPERTY, JSON.stringify(board))
	}
}
