import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface IProps {
	show: boolean
}

const Register = ({ show }: IProps) => {
	return (
		<Modal show={show}>
			<Modal.Header>
				<Modal.Title>Введите ваше имя</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Тут будет имя
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary">
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default Register;