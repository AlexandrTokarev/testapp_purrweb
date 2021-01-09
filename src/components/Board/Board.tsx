import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';
import Button from 'react-bootstrap/Button';
import {IBoardState} from '../../redux/reducers/board';
import {IAppState} from '../../redux/types';
import Column from '../Column/Column';
import AddColumn from '../AddColumn/AddColumn';
import {MOVE_COLUMN} from "../../redux/actions/board";

const Board: React.FC = () => {
	const dispatch = useDispatch();
	const board = useSelector<IAppState, IBoardState>(state => state.board);

	const [addColumn, setAddColumn] = useState<boolean>(false);

	const handleDragEnd = ({ source, destination, type }: DropResult) => {
		if (!destination) return;

		// Move column
		if (type === "COLUMN") {
			// Prevent update if nothing has changed
			if (source.index !== destination.index) {
				dispatch({
					type: MOVE_COLUMN,
					payload: {
						oldIndex: source.index,
						newIndex: destination.index
					}
				});
			}
			return;
		}
		//console.log('drag end', e)
	};

	const toggleAddingList = (): void =>
		setAddColumn(prev => !prev);

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId='board' direction='horizontal' type='COLUMN'>
				{(provided, _snapshot) => (
					<div className='board' ref={provided.innerRef}>
						{board.map((column, idx) => (
							<Column
								key={column.id}
								columnId={column.id}
								title={column.title}
								index={idx}
							/>
						))}

						{provided.placeholder}

						<div className='board__add-list'>
							{addColumn
								? <AddColumn toggleAddingList={toggleAddingList}/>
								: <Button
									onClick={(e:  React.MouseEvent) => { e.stopPropagation(); toggleAddingList()}}
									className='board__add-btn'
								>
									<i className='fa fa-plus'/> Добавить
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