import React from 'react';
import Form from "react-bootstrap/Form";

interface IProps {
	cardId: string,
	index: number,
	columnId: string,
	text: string
}

const Card: React.FC<IProps> = ({ cardId, index, columnId, text}) => {

	return (
		<div className='column__card text-14'>
			<span className='column__card-details'>{text}</span>
		</div>
	)
};

export default Card;
