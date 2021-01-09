import React, {useEffect, useRef, useState} from 'react';
import Button from 'react-bootstrap/Button';
import {useDispatch} from 'react-redux';
import {addColumn} from '../../redux/actions/board';
import {uuidv4} from '../../helpers/utils';
import {Column} from "../../redux/reducers/column";

interface IProps {
	toggleAddingList?: () => void
}

const AddColumn: React.FC<IProps> = ({toggleAddingList}) => {
	const dispatch = useDispatch();
	const dispatchAdd = (val: Column) => dispatch(addColumn(val));
	const [title, setTitle] = useState<string>('');
	const handleChangeTitle = ({target: {value}}: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(value);

	const addRef = useRef<HTMLDivElement>(null);

	const onEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
		if (e.key.toLowerCase() === 'enter' && title !== '') {
			e.preventDefault();
			handleAdd();
		}

		// @ts-ignore
		e.target.style.height = 'inherit';
		// @ts-ignore
		e.target.style.height = `${e.target.scrollHeight}px`;
	};

	useEffect(() => {
		document.addEventListener('click', handleClick, false);

		return () => {
			document.removeEventListener('click', handleClick, false);
		}
	}, [])

	const handleClick = (e: MouseEvent) => {
		const node = addRef.current;

		if (!node || node.contains(e.target as Node)) {
			return;
		}

		toggleAddingList && toggleAddingList();
	};

	const handleAdd = (): void => {
		dispatchAdd({
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
					style={{width: '100%'}}
				/>
			</div>

			<div className='add__buttons'>
				<Button variant='success' onClick={handleAdd} disabled={title === ''}><i className='fa fa-plus'/> Добавить</Button>&nbsp;
				<Button variant='secondary' onClick={toggleAddingList}><i className='fa fa-times'/></Button>
			</div>

		</div>
	)
};

export default AddColumn