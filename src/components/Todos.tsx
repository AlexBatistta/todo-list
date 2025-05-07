import type { JSX } from 'react';
import React from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import {
	DndContext,
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { type ListOfTodos } from '../type';
import { Todo } from './Todo';

interface Props {
	todos: ListOfTodos;
	onRemove: (id: string) => void;
	onReorder: (newTodos: ListOfTodos) => void;
}

function SortableItem({
	todo,
	onRemove,
}: {
	todo: ListOfTodos[number];
	onRemove: (id: string) => void;
}): JSX.Element {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: todo.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<li ref={setNodeRef} style={style} className='w-full'>
			<Todo
				id={todo.id}
				title={todo.title}
				description={todo.description}
				completed={todo.completed}
				priority={todo.priority}
				onRemove={onRemove}
				dragHandleProps={{ listeners, attributes }}
			/>
		</li>
	);
}

export const Todos: React.FC<Props> = ({ todos, onRemove, onReorder }) => {
	const sensors = useSensors(useSensor(PointerSensor));

	const handleDragEnd = (event: DragEndEvent): void => {
		const { active, over } = event;
		if (!over || active.id === over.id) {
			return;
		}

		const oldIndex = todos.findIndex((t) => t.id === active.id);
		const newIndex = todos.findIndex((t) => t.id === over.id);

		const newOrder = arrayMove(todos, oldIndex, newIndex);
		onReorder(newOrder);
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={todos.map((t) => t.id)}
				strategy={verticalListSortingStrategy}
			>
				<div className='bg-slate-100 w-[90%] lg:w-[80%] h-[90%] p-5 lg:p-10 rounded-3xl shadow-lg shadow-slate-500/50 flex flex-col justify-between gap-2'>
					<ul className='flex flex-col h-full gap-4 overflow-y-auto pb-4'>
						{todos.map((todo) => (
							<SortableItem
								key={todo.id}
								todo={todo}
								onRemove={onRemove}
							/>
						))}
					</ul>
				</div>
			</SortableContext>
		</DndContext>
	);
};
