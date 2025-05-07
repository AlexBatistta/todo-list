import { type TodoType } from '../type';
import { FaCheck, FaRegTimesCircle } from 'react-icons/fa';
import { RiDraggable } from 'react-icons/ri';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

const priorityClasses = {
	low: 'hover:bg-green-200 bg-green-100',
	medium: 'hover:bg-yellow-100 bg-yellow-50',
	high: 'hover:bg-red-200 bg-red-100',
};

const priorityBarColors = {
	low: 'bg-green-300',
	medium: 'bg-yellow-300',
	high: 'bg-red-300',
};

interface DragHandleProps {
	listeners?: SyntheticListenerMap;
	attributes?: Record<string, any>;
}

interface Props extends TodoType {
	onRemove: (id: string) => void;
	dragHandleProps?: DragHandleProps;
}

export const Todo: React.FC<Props> = ({
	id,
	title,
	description,
	completed,
	priority,
	onRemove,
	dragHandleProps,
}) => {
	return (
		<div
			className={`flex justify-between items-center py-2 rounded-lg shadow-md gap-4 ${priorityClasses[priority]} w-full overflow-hidden`}
		>
			<div
				className='relative text-2xl flex justify-start items-center  text-slate-500 cursor-grab active:cursor-grabbing w-6 h-7'
				{...dragHandleProps?.attributes}
				{...dragHandleProps?.listeners}
			>
				<RiDraggable className='absolute' />
			</div>

			<div className='relative flex items-center justify-center'>
				<input
					className='appearance-none w-8 h-7 cursor-pointer'
					type='checkbox'
					id={id}
					checked={completed}
					onChange={() => {
						console.log('Toggle Todo', id);
					}}
				/>
				<div
					className={`absolute pointer-events-none w-4 h-4 border-2 rounded-full  ${completed ? 'border-slate-500/25' : 'border-slate-500'}`}
				/>
				{completed && (
					<FaCheck
						className='absolute text-green-500 pointer-events-none'
						size={20}
					/>
				)}
			</div>

			<label className='font-medium text-xl text-slate-700 flex-grow truncate overflow-hidden whitespace-nowrap w-full'>
				{title}
			</label>

			<div className='relative flex items-center justify-center'>
				<FaRegTimesCircle
					className='absolute text-slate-500 pointer-events-none flex-grow truncate overflow-hidden whitespace-nowrap'
					size={20}
				/>
				<button
					className='absolute w-8 h-7 cursor-pointer'
					onClick={() => onRemove(id)}
				/>
			</div>
			<label className='hidden'>{description}</label>
			<div className='relative flex items-center justify-end w-6 h-7'>
				<div
					className={`absolute h-14 w-3 ${priorityBarColors[priority]}`}
				/>
			</div>
		</div>
	);
};
