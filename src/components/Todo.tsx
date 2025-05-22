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
			className={`flex items-center justify-between rounded-lg py-2 shadow-md ${priorityClasses[priority]} w-full overflow-hidden`}
		>
			<div
				className='relative flex h-7 w-6 cursor-grab items-center justify-start text-2xl text-slate-500 active:cursor-grabbing'
				{...dragHandleProps?.attributes}
				{...dragHandleProps?.listeners}
			>
				<RiDraggable className='absolute' />
			</div>

			<div className='relative flex items-center justify-center'>
				<input
					className='h-7 w-8 cursor-pointer appearance-none'
					type='checkbox'
					id={id}
					checked={completed}
					onChange={() => {
						console.log('Toggle Todo', id);
					}}
				/>
				<div
					className={`pointer-events-none absolute h-4 w-4 rounded-full border-2 ${completed ? 'border-slate-500/25' : 'border-slate-500'}`}
				/>
				{completed && (
					<FaCheck
						className='pointer-events-none absolute text-green-500'
						size={20}
					/>
				)}
			</div>

			<label className='w-[50%] flex-grow truncate overflow-hidden text-xl font-medium whitespace-nowrap text-slate-700'>
				{title}
			</label>

			<div className='relative mr-1 ml-4 flex items-center justify-center bg-red-500'>
				<FaRegTimesCircle
					className='pointer-events-none absolute flex-grow truncate overflow-hidden whitespace-nowrap text-slate-500'
					size={20}
				/>
				<button
					className='absolute h-7 w-8 cursor-pointer'
					onClick={() => onRemove(id)}
				/>
			</div>
			<label className='hidden'>{description}</label>
			<div className='relative flex h-7 w-6 items-center justify-end'>
				<div
					className={`absolute h-14 w-3 ${priorityBarColors[priority]}`}
				/>
			</div>
		</div>
	);
};
