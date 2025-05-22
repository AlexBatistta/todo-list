import { useState, type JSX } from 'react';
import { mockToDos } from './mockToDos';
import { Todos } from './components/Todos';
import { Header } from './components/Header';

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
		<div className='flex h-[100dvh] w-full flex-col items-center justify-around bg-slate-300 py-3 lg:py-5'>
			<Header />
			<Todos
				todos={todos}
				onRemove={handleRemove}
				onReorder={handleReorder}
			/>
		</div>
	);
};
