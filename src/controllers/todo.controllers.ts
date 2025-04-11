import { Request, Response } from 'express';
import * as TodoService from '../services/todo.service';

export const getAllTodos = async (_req: Request, res: Response) => {
  console.log('Fetching all todos');
  const todos = await TodoService.getAll();
  console.log(`Todos fetched: ${todos.length}`);  // Corrected line
  res.json(todos);
};

export const getTodoById = async (req: Request, res: Response) => {
  console.log(`Fetching todo by ID: ${req.params.id}`);
  const todo = await TodoService.getById(Number(req.params.id));
  if (!todo) {
    console.log('Todo not found');
    return res.status(404).json({ message: 'Todo not found' });
  }
  console.log('Todo found:', todo);
  res.json(todo);
};

export const createTodo = async (req: Request, res: Response) => {
  console.log('Creating new todo with data:', req.body);
  const todo = await TodoService.create(req.body);
  console.log('New todo created:', todo);
  res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  console.log(`Updating todo with ID: ${req.params.id} with data:`, req.body);
  const updated = await TodoService.update(Number(req.params.id), req.body);
  console.log('Updated todo:', updated);
  res.json(updated);
};

export const toggleTodoDone = async (req: Request, res: Response) => {
  console.log(`Toggling done status for todo ID: ${req.params.id}`);
  const updated = await TodoService.toggleDone(Number(req.params.id));
  console.log('Todo updated:', updated);
  res.json(updated);
};

export const deleteTodo = async (req: Request, res: Response) => {
  console.log(`Deleting todo with ID: ${req.params.id}`);
  await TodoService.remove(Number(req.params.id));
  console.log(`Todo with ID ${req.params.id} deleted`);
  res.status(204).send();
};
