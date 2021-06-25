import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface IProps {
	cardId: string,
	index: number,
	columnId: string,
	text: string
}

const Card: React.FC<IProps> = ({ cardId, index, text }) => {

	return (
		<Draggable draggableId={cardId} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className='column__card text-14'
				>
					<span className='column__card-details'>{text}</span>
				</div>)}
		</Draggable>
	)
};

export default Card;
