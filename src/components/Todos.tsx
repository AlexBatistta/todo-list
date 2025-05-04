import React from 'react';
import { type ListOfTodos } from '../type';
import { Todo } from './Todo';

interface Props {
	todos: ListOfTodos;
}

export const Todos: React.FC<Props> = ({ todos }) => {
	return (
		<div className="bg-slate-100 w-[80%] h-[90%] p-10 rounded-3xl shadow-lg shadow-slate-500/50 flex flex-col justify-between gap-2">
			<ul className="flex flex-col h-[90%] gap-4 overflow-y-auto pb-4">
				{todos.map((todo) => (
					<li key={todo.id} className="w-full">
						<Todo
							key={todo.id}
							id={todo.id}
							title={todo.title}
							completed={todo.completed}
						/>
					</li>
				))}
			</ul>
			<div className="flex justify-center items-center h-10 bg-amber-500" />
		</div>
	);
};
