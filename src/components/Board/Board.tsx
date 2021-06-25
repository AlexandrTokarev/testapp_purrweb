import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Button from 'react-bootstrap/Button';
import Column from '../Column/Column';
import AddColumn from '../AddColumn/AddColumn';
import { boardService } from '../../services/board';

const Board: React.FC = () => {
	let board = boardService.getBoard();

	const [addColumn, setAddColumn] = useState<boolean>(false);
	const [columns, setColumns] = useState<Types.Column[]>(board.columns);

	const handleDragEnd = ({ source, destination, type }: DropResult) => {
		if (!destination) return;

		if (type === 'COLUMN') {
			if (source.index !== destination.index) {
				boardService.moveColumn(source.index, destination.index);
			}
		}

		if (type === 'CARD') {
			if (source.index !== destination.index || source.droppableId !== destination.droppableId) {
				boardService.moveCard(source.droppableId, destination.droppableId, source.index, destination.index);
			}
		}

		updateColumns();
	};

	const toggleAddingList = (): void => {
		setAddColumn(prev => !prev);
		updateColumns();
	};

	const onClickRemoveColumn = (columnId: string) => {
		boardService.removeColumn(columnId);
		updateColumns();
	};

	const updateColumns = () => {
		setColumns(boardService.getBoard().columns);
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId='board' direction='horizontal' type='COLUMN'>
				{(provided, _snapshot) => (
					<div className='board' ref={provided.innerRef}>
						{columns.map((column, idx) => (
							<Column
								key={column.id}
								columnId={column.id}
								title={column.title}
								index={idx}
								defCards={column.cards}
								onRemoveColumn={onClickRemoveColumn}
							/>
						))}

						{provided.placeholder}

						<div className='board__add-list'>
							{addColumn
								? <AddColumn toggleAddingList={toggleAddingList} />
								: <Button
									onClick={(e: React.MouseEvent) => { e.stopPropagation(); toggleAddingList() }}
									className='board__add-btn'
								>
									<i className='fa fa-plus' /> Добавить
								</Button>
							}
						</div>
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}

export default Board;
