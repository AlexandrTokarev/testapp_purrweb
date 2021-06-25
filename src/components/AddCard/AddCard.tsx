import React, { useEffect, useRef, useState } from 'react';
import { boardService } from '../../services/board';
import { uuidv4 } from '../../helpers/utils';
import { userService } from '../../services/currentUser';

interface IProps {
	toggleAddingCard(): void;
	columnId: string;
}

const AddCard = ({ toggleAddingCard, columnId }: IProps) => {
	const [title, setTitle] = useState<string>('');
	const handleChangeTitle = ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(value);

	const addRef = useRef<HTMLTextAreaElement>(null);

	const handleClick = (e: MouseEvent) => {
		const node = addRef.current;

		if (!node || node.contains(e.target as Node)) {
			return;
		}
		toggleAddingCard && onClose();
	};

	useEffect(() => {
		addRef.current?.focus();
	}, [])

	useEffect(() => {
		document.addEventListener('click', handleClick, false);

		return () => {
			document.removeEventListener('click', handleClick, false);
		}
	}, [handleClick])

	const saveCard = (): void => {
		if (title !== '') {
			boardService.addCardToColumn(columnId, {
				id: uuidv4(),
				author: userService.getCurrentUser(),
				title,
				description: ''
			});
		}
	}

	const onClose = () => {
		saveCard();
		toggleAddingCard()
	}

	return (
		<textarea
			className='form-control text-14'
			ref={addRef}
			rows={3}
			value={title}
			onChange={handleChangeTitle}
			placeholder='Ввести заголовок для этой карточки'
		/>
	);
}

export default AddCard
