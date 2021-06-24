import React, { useEffect, useState } from 'react';
import BootstrapCard from 'react-bootstrap/Card';
import {Draggable, Droppable} from "react-beautiful-dnd";
import Card from "../Card/Card";
import Button from "react-bootstrap/Button";
import {Dropdown} from "react-bootstrap";
import AddCard from "../AddCard/AddCard";
import { boardService } from "../../services/board";

interface IProps {
	title: string,
	index: number,
	columnId: string,
	defCards: Types.Card[],
	onRemoveColumn(colId: string): void,
}

const CustomToggle = React.forwardRef(({onClick}: { onClick(): void }, ref: any) => (
	<div ref={ref} className='column__icon' onClick={onClick}>
		<i className='fas fa-ellipsis-h' />
	</div>
));

const Column: React.FC<IProps> = ({title, index, columnId, defCards, onRemoveColumn}) => {
	const [cards, setCards] = useState<Types.Card[]>(defCards);
	const [createdMode, setCreatedMode] = useState(false);

	const onClickAddCard = () => {
		setCreatedMode(true);
	};

	const toggleAddingCard = (): void => {
		setCreatedMode(prev => !prev);
		updateCards();
	};

	const updateCards = () => {
		const newCards = boardService.getCardsForColumn(columnId);
		setCards(newCards);
	}

	return (
		<Draggable draggableId={columnId} index={index}>
			{(provided, snapshot) => (

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
								<Dropdown.Item onClick={() => onRemoveColumn(columnId)}>Удалить</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Header>Сортировка</Dropdown.Header>
								<Dropdown.Item>Сначала новые</Dropdown.Item>
								<Dropdown.Item>Сначала старые</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</BootstrapCard.Header>

					<Droppable droppableId={columnId}>
						{(provided, _snapshot) => (
							<BootstrapCard.Body style={{overflowY: 'auto'}} ref={provided.innerRef}>
								{cards.map((card, idx) =>
									<Card
										key={card.id}
										cardId={card.id}
										index={idx}
										columnId={columnId}
										text={card.title}
									/>
								)}
								{provided.placeholder}
								{createdMode && <AddCard toggleAddingCard={toggleAddingCard} columnId={columnId} />}
							</BootstrapCard.Body>
						)}
					</Droppable>

					<BootstrapCard.Footer className='text-center'>
						<Button className='column__add-card-btn' onClick={onClickAddCard}><i className='fa fa-plus' /> Добавить ещё одну карточку</Button>
					</BootstrapCard.Footer>
				</BootstrapCard>
			)}
		</Draggable>
	)
};

export default Column;
