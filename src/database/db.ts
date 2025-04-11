import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const connectDB = async () => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
  console.log('Connected to SQLite database');
  return db;
};
