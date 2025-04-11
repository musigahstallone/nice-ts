"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controllers_1 = require("../controllers/todo.controllers");
const router = express_1.default.Router();
router.get('/', todo_controllers_1.getAllTodos);
// router.get('/:id', getTodoById);
router.post('/', todo_controllers_1.createTodo);
router.put('/:id', todo_controllers_1.updateTodo);
router.patch('/:id/done', todo_controllers_1.toggleTodoDone);
router.delete('/:id', todo_controllers_1.deleteTodo);
exports.default = router;
