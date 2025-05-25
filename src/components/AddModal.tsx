import React from 'react';
import type { TodoType } from '../type';
import { FaCheck, FaRegTimesCircle } from 'react-icons/fa';

interface Props {
	onAdd: (newTodo: TodoType) => void;
	onClose: () => void;
}
export const AddModal: React.FC<Props> = ({ onAdd, onClose }) => {
	const handleAddTodo = (): void => {
		const newTodo: TodoType = {
			id: crypto.randomUUID(),
			title: 'New Todo',
			description: 'Description of the new todo',
			completed: false,
			priority: 'low',
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
					/>
					<textarea placeholder='Description' />
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
