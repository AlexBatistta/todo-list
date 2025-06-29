import React, { useRef, useState, useEffect } from 'react';
import type { FilterType } from '../type';
import { FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { Checkbox } from './Checkbox';

interface Props {
	onFilter: (filter: FilterType) => void;
	onClose: () => void;
	onClear: () => void;
	currentFilter?: FilterType;
}

export const FilterModal: React.FC<Props> = ({
	onFilter,
	onClose,
	onClear,
	currentFilter,
}) => {
	const [selectedCompleted, setSelectedCompleted] = useState<boolean[]>([]);
	const [selectedPriorities, setSelectedPriorities] = useState<
		('low' | 'medium' | 'high')[]
	>([]);

	const orderRef = useRef<HTMLSelectElement>(null);

	useEffect(() => {
		if (currentFilter) {
			if (currentFilter.completed && currentFilter.completed.length > 0) {
				setSelectedCompleted(currentFilter.completed);
			}

			if (currentFilter.priority && currentFilter.priority.length > 0) {
				setSelectedPriorities(currentFilter.priority);
			}
		}
	}, [currentFilter]);

	const handleCompletedChange = (value: boolean, checked: boolean): void => {
		if (checked) {
			setSelectedCompleted((prev) => [...prev, value]);
		} else {
			setSelectedCompleted((prev) =>
				prev.filter((item) => item !== value),
			);
		}
	};

	const handlePriorityChange = (
		priority: 'low' | 'medium' | 'high',
		checked: boolean,
	): void => {
		if (checked) {
			setSelectedPriorities((prev) => [...prev, priority]);
		} else {
			setSelectedPriorities((prev) =>
				prev.filter((item) => item !== priority),
			);
		}
	};

	const handleFilterTodo = (): void => {
		const order =
			(orderRef.current?.value as
				| 'priority'
				| 'newest'
				| 'oldest'
				| 'manual') || 'manual';

		const newFilter: FilterType = {
			completed:
				selectedCompleted.length > 0 ? selectedCompleted : undefined,
			priority:
				selectedPriorities.length > 0 ? selectedPriorities : undefined,
			order,
		};

		onFilter(newFilter);
		onClose();
	};

	const handleClearFilters = (): void => {
		setSelectedCompleted([]);
		setSelectedPriorities([]);
		if (orderRef.current) {
			orderRef.current.value = 'manual';
		}
		onClear();
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
			<div className='flex w-[50%] flex-col items-center justify-center rounded-lg bg-slate-300 p-4 shadow-md'>
				<h1 className='mb-2 text-xl font-bold text-slate-700 md:text-2xl'>
					Filter Todos
				</h1>

				<div className='flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-white px-6 py-4 shadow-md'>
					<div className='w-full'>
						<label className='mb-2 block text-base font-medium text-slate-700'>
							Completion Status
						</label>
						<div className='flex flex-col gap-4 sm:flex-row'>
							<label className='flex cursor-pointer items-center'>
								<Checkbox
									id='pending'
									checked={selectedCompleted.includes(false)}
									onChange={() =>
										handleCompletedChange(
											false,
											!selectedCompleted.includes(false),
										)
									}
								/>
								<span className='text-sm'>Pending</span>
							</label>
							<label className='flex cursor-pointer items-center'>
								<Checkbox
									id='completed'
									checked={selectedCompleted.includes(true)}
									onChange={() =>
										handleCompletedChange(
											true,
											!selectedCompleted.includes(true),
										)
									}
								/>
								<span className='text-sm'>Completed</span>
							</label>
						</div>
					</div>

					<div className='w-full'>
						<label className='mb-2 block text-base font-medium text-slate-700'>
							Priority
						</label>
						<div className='flex flex-col gap-4 sm:flex-row'>
							<label className='flex cursor-pointer items-center'>
								<Checkbox
									id='priority-high'
									checked={selectedPriorities.includes(
										'high',
									)}
									onChange={() =>
										handlePriorityChange(
											'high',
											!selectedPriorities.includes(
												'high',
											),
										)
									}
								/>
								<span className='text-sm'>High</span>
							</label>
							<label className='flex cursor-pointer items-center'>
								<Checkbox
									id='priority-medium'
									checked={selectedPriorities.includes(
										'medium',
									)}
									onChange={() =>
										handlePriorityChange(
											'medium',
											!selectedPriorities.includes(
												'medium',
											),
										)
									}
								/>
								<span className='text-sm'>Medium</span>
							</label>
							<label className='flex cursor-pointer items-center'>
								<Checkbox
									id='priority-low'
									checked={selectedPriorities.includes('low')}
									onChange={() =>
										handlePriorityChange(
											'low',
											!selectedPriorities.includes('low'),
										)
									}
								/>
								<span className='text-sm'>Low</span>
							</label>
						</div>
					</div>

					<div className='w-full'>
						<label className='mb-1 block text-base font-medium text-slate-700'>
							Sort Order
						</label>
						<select
							ref={orderRef}
							defaultValue={currentFilter?.order || 'manual'}
							className='w-full cursor-pointer rounded-lg border border-slate-300 p-2 text-sm'
						>
							<option value='manual'>Manual Order</option>
							<option value='newest'>Newest First</option>
							<option value='oldest'>Oldest First</option>
							<option value='priority'>By Priority</option>
						</select>
					</div>

					<div className='mt-4 flex items-center justify-center gap-4'>
						<button
							className='cursor-pointer'
							onClick={handleClearFilters}
						>
							<FaRegTrashAlt className='pointer-events-none text-[27px] text-red-500' />
						</button>
						<button
							className='cursor-pointer rounded-full border-3 border-green-500 p-1'
							onClick={handleFilterTodo}
						>
							<FaCheck className='pointer-events-none text-green-500' />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
