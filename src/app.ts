import express from 'express';
import cors from 'cors'; // Import the CORS package
import todoRoutes from './routes/todo.routes';

const app = express();

// Middleware to allow CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Log each incoming request (method, url, body)
app.use((req, res, next) => {
  console.log(`\n${req.method} ${req.originalUrl}`);
  next(); // Continue to the next middleware
});

// Your routes
app.use('/api/todos', todoRoutes);
// app.use('/api/expenses', expenseRoutes);

export default app;
