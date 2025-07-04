import type { JSX } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import {
	DndContext,
	closestCenter,
	PointerSensor,
	TouchSensor,
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
	onCompletedToggle: (id: string) => void;
}

function SortableItem({
	todo,
	onRemove,
	onCompletedToggle,
}: {
	todo: ListOfTodos[number];
	onRemove: (id: string) => void;
	onCompletedToggle: (id: string) => void;
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
				completed={todo.completed}
				priority={todo.priority}
				order={todo.order}
				createdAt={todo.createdAt}
				onRemove={onRemove}
				dragHandleProps={{ listeners, attributes }}
				onCompletedToggle={onCompletedToggle}
			/>
		</li>
	);
}

export const Todos: React.FC<Props> = ({
	todos,
	onRemove,
	onReorder,
	onCompletedToggle,
}) => {
	const listRef = useRef<HTMLUListElement>(null);
	const [isDragging, setIsDragging] = useState(false);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor),
	);

	const handleDragEnd = (event: DragEndEvent): void => {
		setIsDragging(false);

		const { active, over } = event;
		if (!over || active.id === over.id) {
			return;
		}

		const oldIndex = todos.findIndex((t) => t.id === active.id);
		const newIndex = todos.findIndex((t) => t.id === over.id);
		const newOrder = arrayMove(todos, oldIndex, newIndex);
		onReorder(newOrder);
	};

	useEffect(() => {
		if (isDragging) {
			document.body.style.overflowX = 'hidden';
		} else {
			document.body.style.overflowX = '';
		}
	}, [isDragging]);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={() => setIsDragging(true)}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={todos.map((t) => t.id)}
				strategy={verticalListSortingStrategy}
			>
				<div className='flex h-[80%] w-[90%] flex-col justify-between gap-2 rounded-3xl bg-slate-100 p-5 shadow-lg shadow-slate-500/50 lg:w-[80%]'>
					<ul
						ref={listRef}
						className={`flex h-full flex-col gap-4 overflow-x-hidden overflow-y-auto pb-4 ${isDragging && 'touch-none'}`}
					>
						{todos.map((todo) => (
							<SortableItem
								key={todo.id}
								todo={todo}
								onRemove={onRemove}
								onCompletedToggle={onCompletedToggle}
							/>
						))}
					</ul>
				</div>
			</SortableContext>
		</DndContext>
	);
};
