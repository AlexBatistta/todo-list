import { type TodoType } from '../type';
import { FaCheck, FaRegTimesCircle } from 'react-icons/fa';

type Props = TodoType;

export const Todo: React.FC<Props> = ({ id, title, completed }) => {
	return (
		<div className="group flex justify-between items-center bg-slate-200 px-3 py-2 rounded-lg shadow-md gap-4 hover:bg-slate-300 w-full">
			<div className="relative w-6 h-6 flex items-center justify-center">
				<input
					className="appearance-none w-4 h-4 cursor-pointer border-1 rounded-full border-slate-700 checked:border-slate-400"
					type="checkbox"
					id={id}
					checked={completed}
					onChange={() => {
						console.log('Toggle Todo', id);
					}}
				/>
				{completed && (
					<FaCheck
						className="absolute text-green-500 top-0 left-[4px] pointer-events-none"
						size={20}
					/>
				)}
			</div>

			<label className="font-medium text-xl text-slate-700 flex-grow">
				{title}
			</label>
			<div className="relative w-5 h-5">
				<FaRegTimesCircle
					className="absolute group-hover:block sm:hidden text-red-500 pointer-events-none"
					size={20}
				/>
				<button
					className="absolute w-5 h-5 sm:hidden group-hover:block cursor-pointer"
					onClick={() => {
						console.log('Delete Todo', id);
					}}
				/>
			</div>
		</div>
	);
};
