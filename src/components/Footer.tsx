import React from 'react';

export const Footer: React.FC = () => {
	return (
		<footer>
			<p className='mt-2 text-center text-sm text-slate-500'>
				Developed by{' '}
				<a
					className='cursor-pointer font-bold transition-colors duration-200 hover:underline'
					href='https://github.com/AlexBatistta'
				>
					Alex Batistta
				</a>
			</p>
		</footer>
	);
};
