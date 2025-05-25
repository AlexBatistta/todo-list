import { useEffect, useState, type JSX } from 'react';
import { Todos } from './components/Todos';
import { Header } from './components/Header';
import { AddModal } from './components/AddModal';
import { supabase } from './supabaseClient';
import type { ListOfTodos, TodoType } from './type';
import { AiOutlineLoading } from 'react-icons/ai';

const LOCAL_STORAGE_KEY = 'local_todos';

export const App = (): JSX.Element => {
	const [todos, setTodos] = useState<ListOfTodos>([]);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [addedTodos, setAddedTodos] = useState<TodoType[]>([]);
	const [removedIds, setRemovedIds] = useState<string[]>([]);
	const [loadingSync, setLoadingSync] = useState(false);

	useEffect(() => {
		const localTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (localTodos) {
			try {
				const parsed = JSON.parse(localTodos) as ListOfTodos;
				setTodos(parsed);
			} catch (e) {
				console.error('Error parsing todos from localStorage', e);
				fetchTodosFromSupabase();
			}
		} else {
			fetchTodosFromSupabase();
		}
	}, []);

	const updateTodosLocally = (newTodos: ListOfTodos): void => {
		setTodos(newTodos);
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
	};

	const fetchTodosFromSupabase = async (): Promise<void> => {
		const { data, error } = await supabase
			.from('todos')
			.select('*')
			.order('order', { ascending: true });
		if (error) {
			console.error('Error fetching todos from Supabase', error);
			return;
		}
		if (data) {
			updateTodosLocally(data);
			setAddedTodos([]);
			setRemovedIds([]);
		}
	};

	const syncWithSupabase = async (): Promise<void> => {
		if (addedTodos.length === 0 && removedIds.length === 0) {
			return;
		}
		setLoadingSync(true);

		try {
			if (removedIds.length > 0) {
				const { error: delError } = await supabase
					.from('todos')
					.delete()
					.in('id', removedIds);
				if (delError) {
					console.error('Error deleting todos', delError);
				}
			}

			if (addedTodos.length > 0) {
				const { error: addError } = await supabase
					.from('todos')
					.insert(addedTodos);
				if (addError) {
					console.error('Error adding todos', addError);
				}
			}

			const orderUpdates = todos.map(({ id, order }) => ({ id, order }));
			for (const { id, order } of orderUpdates) {
				await supabase.from('todos').update({ order }).eq('id', id);
			}

			setAddedTodos([]);
			setRemovedIds([]);
		} catch (err) {
			console.error('Error syncing todos', err);
		} finally {
			setLoadingSync(false);
		}
	};

	useEffect(() => {
		syncWithSupabase();
	}, [todos, addedTodos, removedIds]);

	useEffect(() => {
		const handleBeforeUnload = (): void => {
			if (addedTodos.length > 0 || removedIds.length > 0) {
				syncWithSupabase();
			}
		};
		window.addEventListener('beforeunload', handleBeforeUnload);
		return (): void => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [addedTodos, removedIds, todos]);

	const handleAddTodo = (newTodo: TodoType): void => {
		const updatedTodos = [
			{ ...newTodo, order: 0 },
			...todos.map((t) => ({ ...t, order: t.order + 1 })),
		];
		updateTodosLocally(updatedTodos);
		setAddedTodos([...addedTodos, { ...newTodo, order: 0 }]);
		setIsAddModalOpen(false);
	};

	const handleRemove = (id: string): void => {
		const updatedTodos = todos
			.filter((todo) => todo.id !== id)
			.map((todo, index) => ({ ...todo, order: index }));
		updateTodosLocally(updatedTodos);
		setRemovedIds([...removedIds, id]);
	};

	const handleReorder = (newTodos: ListOfTodos): void => {
		updateTodosLocally(newTodos);
	};

	return (
		<div className='flex h-[100dvh] w-full flex-col items-center justify-around bg-slate-300 py-3 lg:py-5'>
			<Header onAdd={() => setIsAddModalOpen(true)} onFilter={() => {}} />

			<Todos
				todos={todos}
				onRemove={handleRemove}
				onReorder={handleReorder}
			/>
			{isAddModalOpen && (
				<AddModal
					onAdd={handleAddTodo}
					onClose={() => setIsAddModalOpen(false)}
				/>
			)}
			<div className='absolute right-2 bottom-2 text-slate-500'>
				{loadingSync && <AiOutlineLoading className='animate-spin' />}
			</div>
		</div>
	);
};
