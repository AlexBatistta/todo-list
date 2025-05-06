export interface TodoType {
	id: string;
	title: string;
	completed: boolean;
	priority: 'low' | 'medium' | 'high';
}

export type ListOfTodos = TodoType[];
