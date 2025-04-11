export interface Todo {
    id: number;
    title: string;
    description?: string;
    dueDate?: string; // ISO format
    completed: boolean;
    createdAt: string;
    updatedAt?: string;
  }
  