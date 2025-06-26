export interface TodoType {
	id: string;
	title: string;
	completed: boolean;
	priority: 'low' | 'medium' | 'high';
	order: number;
	createdAt: Date;
}

export interface FilterType {
	completed?: boolean[];
	priority?: ('low' | 'medium' | 'high')[];
	order: 'priority' | 'newest' | 'oldest' | 'manual';
}

export type ListOfTodos = TodoType[];
