import React, { useRef } from 'react';
import type { TodoType } from '../type';
import { FaCheck, FaRegTimesCircle } from 'react-icons/fa';

interface Props {
	onAdd: (newTodo: TodoType) => void;
	onClose: () => void;
}
export const AddModal: React.FC<Props> = ({ onAdd, onClose }) => {
	const titleRef = useRef<HTMLInputElement>(null);
	const priorityRef = useRef<HTMLSelectElement>(null);

	const handleAddTodo = (): void => {
		const title = titleRef.current?.value.trim() || '';
		const priority =
			(priorityRef.current?.value as 'low' | 'medium' | 'high') || 'low';

		if (!title) {
			alert('Title is required.');
			return;
		}

		const newTodo: TodoType = {
			id: crypto.randomUUID(),
			title,
			completed: false,
			priority,
			order: -1,
		};
		onAdd(newTodo);
	};
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
			<div className='flex flex-col items-center justify-center rounded-lg bg-slate-300 p-4 shadow-md'>
				<h1 className='mb-2 text-xl font-bold text-slate-700 md:text-2xl'>
					Add Todo
				</h1>

				<div className='flex flex-col items-center justify-center gap-2 rounded-lg bg-white p-4 shadow-md'>
					<input
						type='text'
						placeholder='Title'
						className='w-full rounded-lg border p-2'
						ref={titleRef}
					/>
					<select
						ref={priorityRef}
						defaultValue='low'
						className='w-full rounded-lg border p-2'
					>
						<option value='low'>Low</option>
						<option value='medium'>Medium</option>
						<option value='high'>High</option>
					</select>
					<div className='flex items-center justify-center gap-2'>
						<button
							className='cursor-pointer p-1'
							onClick={onClose}
						>
							<FaRegTimesCircle className='pointer-events-none text-3xl text-red-500' />
						</button>
						<button
							className='cursor-pointer rounded-full border-3 border-green-500 p-1'
							onClick={handleAddTodo}
						>
							<FaCheck className='pointer-events-none text-green-500' />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
