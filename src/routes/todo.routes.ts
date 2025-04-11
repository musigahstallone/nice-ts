import express from 'express';
import { getAllTodos,createTodo, updateTodo, toggleTodoDone, deleteTodo } from '../controllers/todo.controllers';


const router = express.Router();

router.get('/', getAllTodos);
// router.get('/:id', getTodoById);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.patch('/:id/done', toggleTodoDone);
router.delete('/:id', deleteTodo);

export default router;
