export interface TodoType {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	priority: 'low' | 'medium' | 'high';
	order: number;
}

export type ListOfTodos = TodoType[];
