import { FaRegTimesCircle } from 'react-icons/fa';
import { MdOutlineFilterAlt } from 'react-icons/md';

interface Props {
	className?: string;
	onAdd: () => void;
	onFilter: () => void;
}

export const Header: React.FC<Props> = ({ className, onAdd, onFilter }) => {
	return (
		<header
			className={`${className} mb-2 flex w-[90%] items-center justify-between lg:w-[80%]`}
		>
			<button
				className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-slate-100 shadow-md shadow-slate-500/50'
				onClick={onFilter}
			>
				<MdOutlineFilterAlt className='pointer-events-none text-slate-500' />
			</button>

			<h1 className='text-xl font-bold text-slate-700 md:text-2xl'>
				To-Do List
			</h1>
			<button
				className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-slate-100 shadow-md shadow-slate-500/50'
				onClick={onAdd}
			>
				<FaRegTimesCircle className='pointer-events-none absolute rotate-45 text-slate-500' />
			</button>
		</header>
	);
};
