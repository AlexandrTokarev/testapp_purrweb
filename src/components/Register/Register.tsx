import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { isNullOrEmpty } from '../../helpers/utils';
import { LOGIN } from '../../redux/actions/user';

interface IProps {
	show: boolean
}

const Register: React.FC<IProps> = ({ show = false }) => {
	const [name, setName] = useState<string>('');
	const dispatch = useDispatch();

	const onChangeName = ({ target: { value }}: React.ChangeEvent<HTMLInputElement>): void => {
		setName(value)
	}

	const onClickSave = () => {
		dispatch({
			type: LOGIN,
			payload: name
		})
	}

	return (
		<Modal show={show}>
			<Modal.Header>
				<Modal.Title>Имитация авторизации</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<Form>
				<Form.Group>
					<Form.Control type='text' placeholder='Введите ваше имя' name='userName' value={name} onChange={onChangeName}/>
				</Form.Group>
			</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='primary' disabled={isNullOrEmpty(name)} onClick={onClickSave}>
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default Register;