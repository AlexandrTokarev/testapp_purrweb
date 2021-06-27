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
	},
	getCardsForColumn(columnId: string): Types.Card[] {
		const board = this.getBoard();
		return board.columns.find(c => c.id === columnId)?.cards ?? [];
	},
	moveCard(sourceColumnId: string, targetColumnId: string, oldCardIndex: number, newCardIndex: number): void {
		const board = this.getBoard();
		const columns = [...board.columns];
		const sourceColumn = columns.find(c => c.id === sourceColumnId);

		if (!sourceColumn)
			throw Error('Колонка не найдена');

		const targetCard = sourceColumn.cards[oldCardIndex];

		if (sourceColumnId !== targetColumnId) {
			sourceColumn.cards = sourceColumn.cards.filter(c => c.id !== targetCard.id);
			const targetColumn = columns.find(c => c.id === targetColumnId);

			if (!targetColumn)
				throw Error('Целевая колонка не найдена');

			const targetColumnCards = [...targetColumn.cards];

			if (targetColumnCards.length === 0) {
				targetColumnCards.push(targetCard);
				targetColumn.cards = targetColumnCards;
			} else {
				const newCards = Array.from(targetColumnCards ?? []);
				newCards.splice(newCardIndex, 0, targetCard);
				targetColumn.cards = newCards;
			}
		} else {
			const newCards = Array.from(sourceColumn.cards ?? []);
			newCards.splice(oldCardIndex, 1);
			newCards.splice(newCardIndex, 0, targetCard);
			sourceColumn.cards = newCards;
		}
		board.columns = columns;
		localStorage.setItem(BOARD_PROPERTY, JSON.stringify(board))
	},
	removeCard(columnId: string, cardId: string): void {
		const column = this.getBoard().columns.find(c => c.id === columnId);

		if (!column)
			throw Error('Колонка не найдена');

		column.cards = column.cards.filter(c => c.id !== cardId);
	}
}
