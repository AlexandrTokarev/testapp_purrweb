import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Dropdown } from "react-bootstrap";

interface IProps {
	cardId: string;
	index: number;
	columnId: string;
	text: string;
}

const CustomToggle = React.forwardRef(({ onClick }: { onClick(): void }, ref: any) => (
	<div ref={ref} className='column__card-edit' onClick={onClick}>
		<i className='fas fa-pen'/>
	</div>
));

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
					<Dropdown drop='right'>
						<Dropdown.Toggle as={CustomToggle}/>
						<Dropdown.Menu >
							<Dropdown.Item>Открыть</Dropdown.Item>
							<Dropdown.Item>Изменить</Dropdown.Item>
							<Dropdown.Item>Удалить</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>)}
		</Draggable>
	)
};

export default Card;
