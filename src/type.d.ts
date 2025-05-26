export interface TodoType {
	id: string;
	title: string;
	completed: boolean;
	priority: 'low' | 'medium' | 'high';
	order: number;
}

export type ListOfTodos = TodoType[];
