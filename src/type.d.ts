export interface TodoType {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	priority: 'low' | 'medium' | 'high';
}

export type ListOfTodos = TodoType[];
