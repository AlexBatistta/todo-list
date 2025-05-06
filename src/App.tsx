import { useState, type JSX } from 'react';
import { mockToDos } from './mockToDos';
import { Todos } from './components/Todos';

export const App = (): JSX.Element => {
	const [todos, setTodos] = useState(mockToDos);

	const handleRemove = (id: string): void => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};

	const handleReorder = (newTodos: typeof todos): void => {
		setTodos(newTodos);
	};

	return (
		<div className="flex flex-col justify-around items-center bg-slate-300 w-full h-screen py-5">
			<h1 className="text-4xl font-bold text-slate-700">To-Do List</h1>
			<Todos
				todos={todos}
				onRemove={handleRemove}
				onReorder={handleReorder}
			/>
		</div>
	);
};
