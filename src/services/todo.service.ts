import { connectDB } from '../database/db';
import { Todo } from '../models/todo.model';

export const getAll = async (): Promise<Todo[]> => {
  const db = await connectDB();
  return db.all('SELECT * FROM todos ORDER BY completed ASC');
};

export const getById = async (id: number): Promise<Todo | undefined> => {
  const db = await connectDB();
  return db.get('SELECT * FROM todos WHERE id = ?', id);
};

export const create = async (data: Todo): Promise<Todo> => {
  const db = await connectDB();
  const now = new Date().toISOString();
  const { title, description, dueDate } = data;

  const result = await db.run(
    `INSERT INTO todos (title, description, dueDate, completed, createdAt) VALUES (?, ?, ?, ?, ?)`,
    title,
    description ?? '',
    dueDate ?? '',
    false,
    now
  );

  return {
    id: 1,
    title,
    description,
    dueDate,
    completed: false,
    createdAt: now,
  };
};

export const update = async (id: number, data: Partial<Todo>): Promise<Todo> => {
  const db = await connectDB();
  const now = new Date().toISOString();
  await db.run(
    `UPDATE todos SET title = ?, description = ?, dueDate = ?, updatedAt = ? WHERE id = ?`,
    data.title,
    data.description,
    data.dueDate,
    now,
    id
  );
  return getById(id) as Promise<Todo>;
};

export const toggleDone = async (id: number): Promise<Todo> => {
  const db = await connectDB();
  const current = await getById(id);
  const newStatus = !current?.completed;
  await db.run(`UPDATE todos SET completed = ?, updatedAt = ? WHERE id = ?`, newStatus, new Date().toISOString(), id);
  return getById(id) as Promise<Todo>;
};

export const remove = async (id: number): Promise<void> => {
  const db = await connectDB();
  await db.run('DELETE FROM todos WHERE id = ?', id);
};
