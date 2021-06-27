import React, { useState } from 'react';
import BootstrapCard from 'react-bootstrap/Card';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card';
import Button from 'react-bootstrap/Button';
import { Dropdown } from 'react-bootstrap';
import AddCard from '../AddCard/AddCard';

interface IProps {
	title: string;
	index: number;
	onRemoveColumn(colId: string): void;
	column: Types.Column;
	updateColumns(): void;
}

const CustomToggle = React.forwardRef(({ onClick }: { onClick(): void }, ref: any) => (
	<div ref={ref} className='column__icon' onClick={onClick}>
		<i className='fas fa-ellipsis-h' />
	</div>
));

const Column: React.FC<IProps> = ({ title, index, onRemoveColumn, column, updateColumns }) => {
	const [createdMode, setCreatedMode] = useState(false);

	const onClickAddCard = () => {
		setCreatedMode(true);
	};

	const toggleAddingCard = (): void => {
		setCreatedMode(prev => !prev);
		updateColumns();
	};

	return (
		<Draggable draggableId={column.id} index={index}>
			{(provided) => (

				<BootstrapCard
					className='column'
					bg='light'
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<BootstrapCard.Header>
						<span className='column__title'>{title}</span>
						<Dropdown>
							<Dropdown.Toggle as={CustomToggle} />
							<Dropdown.Menu>
								<Dropdown.Header>Действия со списком</Dropdown.Header>
								<Dropdown.Item onClick={onClickAddCard}>Добавить карточку...</Dropdown.Item>
								<Dropdown.Item onClick={() => onRemoveColumn(column.id)}>Удалить</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Header>Сортировка</Dropdown.Header>
								<Dropdown.Item>Сначала новые</Dropdown.Item>
								<Dropdown.Item>Сначала старые</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</BootstrapCard.Header>

					<Droppable droppableId={column.id} type='CARD'>
						{(provided, _snapshot) => (
							<BootstrapCard.Body style={{ overflowY: 'auto' }} ref={provided.innerRef}>
								{column.cards.map((card, idx) =>
									<Card
										key={card.id}
										cardId={card.id}
										index={idx}
										columnId={column.id}
										text={card.title}
									/>
								)}
								{provided.placeholder}
								{createdMode && <AddCard toggleAddingCard={toggleAddingCard} columnId={column.id} />}
							</BootstrapCard.Body>
						)}
					</Droppable>

					<BootstrapCard.Footer className='text-center'>
						<Button className='column__add-card-btn' onClick={onClickAddCard}>
							<i className='fa fa-plus' /> Добавить ещё одну карточку</Button>
					</BootstrapCard.Footer>
				</BootstrapCard>
			)}
		</Draggable>
	)
};

export default Column;
