import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Button from "react-bootstrap/Button";

interface IProps {
	cardId: string;
	index: number;
	columnId: string;
	text: string;
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
					<Button className='column__card-edit'><i className='fas fa-pen'/></Button>
				</div>)}
		</Draggable>
	)
};

export default Card;
