import React, { useRef, useState } from 'react';
import type { TodoType } from '../type';
import { FaCheck, FaRegTimesCircle } from 'react-icons/fa';

interface Props {
	onAdd: (newTodo: TodoType) => void;
	onClose: () => void;
}
export const AddModal: React.FC<Props> = ({ onAdd, onClose }) => {
	const titleRef = useRef<HTMLInputElement>(null);
	const priorityRef = useRef<HTMLSelectElement>(null);
	const [warning, setWarning] = useState('');

	const handleAddTodo = (): void => {
		const title = titleRef.current?.value.trim() || '';
		const priority =
			(priorityRef.current?.value as 'low' | 'medium' | 'high') || 'low';

		if (!title) {
			setWarning('Title is required.');
			return;
		}
		setWarning('');

		const newTodo: TodoType = {
			id: crypto.randomUUID(),
			title,
			completed: false,
			priority,
			order: -1,
			createdAt: new Date(),
		};
		onAdd(newTodo);
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
			<div className='flex w-[50%] flex-col items-center justify-center rounded-lg bg-slate-300 p-4 shadow-md'>
				<h1 className='mb-2 text-xl font-bold text-slate-700 md:text-2xl'>
					Add Todo
				</h1>

				<div className='flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 shadow-md'>
					<div className='relative w-full'>
						<label className='mb-1 block text-base font-medium text-slate-700'>
							Description
						</label>
						<input
							type='text'
							placeholder='Enter a description'
							className='mb-2 w-full rounded-lg border border-slate-300 p-2 text-sm'
							ref={titleRef}
							onChange={(e) => {
								if (e.target.value.trim() !== '') {
									setWarning('');
								}
							}}
						/>
						{warning && (
							<p className='absolute text-xs text-red-500'>
								{warning}
							</p>
						)}
					</div>

					<div className='mt-4 w-full'>
						<label className='mb-1 block text-base font-medium text-slate-700'>
							Importance
						</label>
						<select
							ref={priorityRef}
							defaultValue='low'
							className='w-full cursor-pointer rounded-lg border border-slate-300 p-2 text-sm'
						>
							<option value='low'>Low</option>
							<option value='medium'>Medium</option>
							<option value='high'>High</option>
						</select>
					</div>

					<div className='mt-4 flex items-center justify-center gap-4'>
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
