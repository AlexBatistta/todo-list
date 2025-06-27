import React from 'react';
import { FaCheck } from 'react-icons/fa';

interface CheckboxProps {
	id: string;
	checked: boolean;
	onChange: (id: string) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
	id,
	checked,
	onChange,
}) => {
	return (
		<div className='relative flex items-center justify-center'>
			<input
				className='h-7 w-8 cursor-pointer appearance-none'
				type='checkbox'
				id={id}
				checked={checked}
				onChange={() => {
					onChange(id);
				}}
			/>
			<div
				className={`pointer-events-none absolute h-4 w-4 rounded-full border-2 ${checked ? 'border-slate-500/25' : 'border-slate-500'}`}
			/>
			{checked && (
				<FaCheck
					className='pointer-events-none absolute text-green-500'
					size={20}
				/>
			)}
		</div>
	);
};
