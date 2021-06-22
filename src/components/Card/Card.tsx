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
		<Form.Control as="textarea" rows={3} defaultValue={text} />
	)
};

export default Card;
