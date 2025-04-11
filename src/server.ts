import app from './app';
import { connectDB } from './database/db';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

async function createTables() {
  const db = await connectDB();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      dueDate TEXT,
      completed BOOLEAN DEFAULT 0,
      createdAt TEXT,
      updatedAt TEXT
    );
  `);

  console.log('✅ Tables created!');
}

createTables();
