interface Props {
	className?: string;
}
export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header
			className={`${className} mb-2 flex w-[90%] items-center justify-between lg:w-[80%]`}
		>
			<button className='flex h-8 w-8 justify-center gap-2 rounded-lg bg-slate-100 shadow-lg shadow-slate-500/50' />

			<h1 className='text-xl font-bold text-slate-700 md:text-2xl'>
				To-Do List
			</h1>
			<button className='flex h-8 w-8 justify-center gap-2 rounded-lg bg-slate-100 shadow-lg shadow-slate-500/50' />
		</header>
	);
};
