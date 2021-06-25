import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { uuidv4 } from '../../helpers/utils';
import { boardService } from '../../services/board';

interface IProps {
	toggleAddingList?: () => void
}

const AddColumn: React.FC<IProps> = ({ toggleAddingList }) => {
	const [title, setTitle] = useState<string>('');
	const handleChangeTitle = ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(value);

	const addRef = useRef<HTMLDivElement>(null);

	const onEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
		if (e.key.toLowerCase() === 'enter' && title !== '') {
			e.preventDefault();
			handleAdd();
		}

		const el = e.target as HTMLTextAreaElement;

		el.style.height = 'inherit';
		el.style.height = `${el.scrollHeight}px`;
	};

	const handleClick = useCallback((e: MouseEvent) => {
		const node = addRef.current;

		if (!node || node.contains(e.target as Node)) {
			return;
		}

		toggleAddingList && toggleAddingList();
	}, [toggleAddingList]);

	useEffect(() => {
		document.addEventListener('click', handleClick, false);

		return () => {
			document.removeEventListener('click', handleClick, false);
		}
	}, [handleClick])

	const handleAdd = (): void => {
		boardService.addColumn({
			id: uuidv4(),
			title,
			created: new Date().toISOString(),
			updated: new Date().toISOString(),
			cards: []
		});

		toggleAddingList && toggleAddingList();
	};

	return (
		<div className='add' ref={addRef}>
			<div className='add_title'>
				<textarea
					autoFocus
					className='add__textarea'
					placeholder='Введите заголовок...'
					value={title}
					onChange={handleChangeTitle}
					onKeyDown={onEnter}
					style={{ width: '100%' }}
				/>
			</div>

			<div className='add__buttons'>
				<Button variant='success' onClick={handleAdd} disabled={title === ''}><i className='fa fa-plus' /> Добавить</Button>&nbsp;
				<Button variant='secondary' onClick={toggleAddingList}><i className='fa fa-times' /></Button>
			</div>

		</div>
	)
};

export default AddColumn
