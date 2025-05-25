import { useState, type JSX } from 'react';
import { mockToDos } from './mockToDos';
import { Todos } from './components/Todos';
import { Header } from './components/Header';
import { AddModal } from './components/AddModal';

export const App = (): JSX.Element => {
	const [todos, setTodos] = useState(mockToDos);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	const handleRemove = (id: string): void => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};

	const handleReorder = (newTodos: typeof todos): void => {
		setTodos(newTodos);
	};

	const handleAdd = (): void => {
		setIsAddModalOpen(true);
		/*const newTodo = {
			id: crypto.randomUUID(),
			title: 'New Todo',
			description: 'Description of the new todo',
			completed: false,
			priority: 'low',
		};*/
		// setTodos((prevTodos) => [...prevTodos, newTodo]);
	};

	const handleAddTodo = (newTodo: (typeof todos)[number]): void => {
		setTodos((prevTodos) => [...prevTodos, newTodo]);
		setIsAddModalOpen(false);
	};

	const handleCloseAddModal = (): void => {
		setIsAddModalOpen(false);
	};

	const handleFilter = (): void => {
		console.log('Filter Todos');
	};

	return (
		<div className='flex h-[100dvh] w-full flex-col items-center justify-around bg-slate-300 py-3 lg:py-5'>
			<Header onAdd={handleAdd} onFilter={handleFilter} />
			<Todos
				todos={todos}
				onRemove={handleRemove}
				onReorder={handleReorder}
			/>
			{isAddModalOpen && (
				<AddModal onAdd={handleAddTodo} onClose={handleCloseAddModal} />
			)}
		</div>
	);
};
