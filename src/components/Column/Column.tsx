import React from 'react';
import Card from 'react-bootstrap/Card';
import {Draggable} from "react-beautiful-dnd";

interface IProps {
	title: string,
	index: number,
	columnId: string
}

const Column: React.FC<IProps> = ({title, index, columnId}) => {

	return (
		<Draggable draggableId={columnId} index={index}>
			{(provided, snapshot) => (

				<Card
					className='column'
					bg='light'
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<Card.Header>
						<span className='column__title'>{title}</span>
						<div className='column__icon'>
							<i className='fas fa-ellipsis-h'/>
						</div>
					</Card.Header>
					<Card.Body style={{overflowY: 'auto'}}>

						<Card.Text>
							Some quick example text to build on the card title and make up the bulk of
							the card's content.
							<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum maxime nisi obcaecati provident
								velit? Autem blanditiis consequatur dicta doloremque esse facere fuga libero, maxime nihil
								pariatur rem sapiente vero, voluptas.</div>
							<div>Ad dignissimos ducimus, esse explicabo fuga molestiae mollitia. Adipisci consequatur eligendi
								iure laborum, maxime modi necessitatibus officia possimus repellendus sapiente sunt ullam.
								Accusantium commodi doloremque quia repellendus repudiandae, sed veritatis!
							</div>
							<div>Exercitationem, id minus molestiae necessitatibus numquam provident sunt voluptatem!
								Accusantium autem beatae cumque eaque ipsa. Ab aliquid cum doloremque eos iusto maiores natus
								nihil nostrum pariatur, quo sed unde voluptates?
							</div>
							<div>Culpa dolorum eos facere mollitia nihil perspiciatis praesentium quo! Amet autem deleniti
								dolor, ea eius, fugiat ipsa maxime molestias, nisi quam ratione sapiente suscipit vel? Aut ea
								mollitia odio qui?
							</div>
							<div>Aperiam corporis culpa cum esse exercitationem impedit, in ipsum iusto nostrum nulla odio quae
								quos sapiente tempore ullam veritatis, voluptas. Adipisci aliquid consectetur dignissimos dolor
								et natus similique tempora, vel?
							</div>
							<div>Asperiores assumenda ea odio sunt vitae! Animi assumenda, atque blanditiis deleniti deserunt
								dolor doloribus dolorum ducimus error est expedita hic id ipsa iure laudantium nulla odit quia
								quis reiciendis similique.
							</div>
						</Card.Text>
					</Card.Body>
				</Card>
			)}
		</Draggable>
	)
};

export default Column;