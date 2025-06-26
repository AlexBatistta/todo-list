import { useEffect, useState, type JSX } from 'react';
import { Todos } from './components/Todos';
import { Header } from './components/Header';
import { AddModal } from './components/AddModal';
import type { FilterType, ListOfTodos, TodoType } from './type';
import { FilterModal } from './components/FilterModal';

const LOCAL_STORAGE_KEY = 'local_todos';

export const App = (): JSX.Element => {
	const [allTodos, setAllTodos] = useState<ListOfTodos>([]);
	const [filteredTodos, setFilteredTodos] = useState<ListOfTodos>([]);
	const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

	useEffect(() => {
		const localTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (localTodos) {
			try {
				const parsed = JSON.parse(localTodos) as ListOfTodos;
				const todosWithDates = parsed.map((todo) => ({
					...todo,
					createdAt: todo.createdAt
						? new Date(todo.createdAt)
						: new Date(),
				}));
				setAllTodos(todosWithDates);
			} catch (e) {
				console.error('Error parsing todos from localStorage', e);
				setAllTodos([]);
			}
		}
	}, []);

	const updateTodosLocally = (newTodos: ListOfTodos): void => {
		setAllTodos(newTodos);
		if (activeFilter) {
			setFilteredTodos(applyFilters(newTodos, activeFilter));
		}
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
	};

	const applyFilters = (
		todos: ListOfTodos,
		filter: FilterType,
	): ListOfTodos => {
		let filtered = [...todos];

		if (filter.completed && filter.completed.length > 0) {
			filtered = filtered.filter((todo) =>
				filter.completed!.includes(todo.completed),
			);
		}

		if (filter.priority && filter.priority.length > 0) {
			filtered = filtered.filter((todo) =>
				filter.priority!.includes(todo.priority),
			);
		}

		switch (filter.order) {
			case 'newest':
				filtered.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() -
						new Date(a.createdAt).getTime(),
				);
				break;
			case 'oldest':
				filtered.sort(
					(a, b) =>
						new Date(a.createdAt).getTime() -
						new Date(b.createdAt).getTime(),
				);
				break;
			case 'priority': {
				const priorityOrder = { high: 3, medium: 2, low: 1 };
				filtered.sort(
					(a, b) =>
						priorityOrder[b.priority] - priorityOrder[a.priority],
				);
				break;
			}
			case 'manual':
			default:
				break;
		}

		return filtered;
	};

	const handleAddTodo = (newTodo: TodoType): void => {
		const todoWithDate = {
			...newTodo,
			createdAt: new Date(),
			order: allTodos.length,
		};
		const updatedTodos = [todoWithDate, ...allTodos];
		updateTodosLocally(updatedTodos);
		setIsAddModalOpen(false);
	};

	const handleFilterTodo = (filter: FilterType): void => {
		setActiveFilter(filter);
		const filtered = applyFilters(allTodos, filter);
		setFilteredTodos(filtered);
		setIsFilterModalOpen(false);
	};

	const handleRemove = (id: string): void => {
		const updatedTodos = allTodos.filter((todo) => todo.id !== id);
		updateTodosLocally(updatedTodos);
	};

	const handleReorder = (newTodos: ListOfTodos): void => {
		setAllTodos(newTodos);
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));

		if (activeFilter && activeFilter.order !== 'manual') {
			const updatedFilter: FilterType = {
				...activeFilter,
				order: 'manual',
			};
			setActiveFilter(updatedFilter);

			if (updatedFilter.completed || updatedFilter.priority) {
				const filtered = applyFilters(newTodos, updatedFilter);
				setFilteredTodos(filtered);
			} else {
				setFilteredTodos(newTodos);
			}
		} else if (activeFilter) {
			const filtered = applyFilters(newTodos, activeFilter);
			setFilteredTodos(filtered);
		}
	};

	const handleCompletedToggle = (id: string): void => {
		const updatedTodos = allTodos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo,
		);
		updateTodosLocally(updatedTodos);
	};

	const clearFilters = (): void => {
		setActiveFilter(null);
		setFilteredTodos([]);
	};

	return (
		<div className='flex h-[100dvh] w-full flex-col items-center justify-around bg-slate-300 py-3 lg:py-5'>
			<Header
				onAdd={() => setIsAddModalOpen(true)}
				onFilter={() => {
					setIsFilterModalOpen(true);
				}}
			/>

			<Todos
				todos={activeFilter ? filteredTodos : allTodos}
				onRemove={handleRemove}
				onReorder={handleReorder}
				onCompletedToggle={handleCompletedToggle}
			/>

			{isAddModalOpen && (
				<AddModal
					onAdd={handleAddTodo}
					onClose={() => setIsAddModalOpen(false)}
				/>
			)}

			{isFilterModalOpen && (
				<FilterModal
					onFilter={handleFilterTodo}
					onClose={() => setIsFilterModalOpen(false)}
					currentFilter={activeFilter || undefined}
				/>
			)}
		</div>
	);
};
