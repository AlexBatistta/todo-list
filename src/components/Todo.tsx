import { type TodoType } from '../type';
import { FaCheck, FaRegTimesCircle } from 'react-icons/fa';
import { RiDraggable } from 'react-icons/ri';

interface Props extends TodoType {
	onRemove: (id: string) => void;
}

export const Todo: React.FC<Props> = ({
	id,
	title,
	completed,
	priority,
	onRemove,
}) => {
	return (
		<div
			className={`flex justify-between items-center px-3 py-2 rounded-lg shadow-md gap-4 ${priority === 'low' ? 'hover:bg-green-200' : priority === 'medium' ? 'hover:bg-yellow-100' : 'hover:bg-red-200'} w-full overflow-hidden ${priority === 'low' ? 'bg-green-100' : priority === 'medium' ? 'bg-yellow-50' : 'bg-red-100'}`}
		>
			<div className="relative flex items-center justify-center">
				<RiDraggable className="absolute text-2xl text-slate-500" />
			</div>
			<div className="relative w-6 h-6 flex items-center justify-center">
				<input
					className="appearance-none w-4 h-4 cursor-pointer border-2 rounded-full border-slate-700 checked:border-slate-700/10"
					type="checkbox"
					id={id}
					checked={completed}
					onChange={() => {
						console.log('Toggle Todo', id);
					}}
				/>
				{completed && (
					<FaCheck
						className="absolute text-green-500 pointer-events-none"
						size={20}
					/>
				)}
			</div>

			<label className="font-medium text-xl text-slate-700 flex-grow">
				{title}
			</label>
			<div className="relative w-5 h-5">
				<FaRegTimesCircle
					className="absolute text-slate-700 pointer-events-none"
					size={20}
				/>
				<button
					className="absolute w-5 h-5 cursor-pointer"
					onClick={() => {
						onRemove(id);
					}}
				/>
			</div>
			<div className="relative flex items-center justify-start">
				<div
					className={`absolute h-14 w-3 ${priority === 'low' ? 'bg-green-300' : priority === 'medium' ? 'bg-yellow-300' : 'bg-red-300'}`}
				/>
			</div>
		</div>
	);
};
