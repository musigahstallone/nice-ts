"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.toggleTodoDone = exports.updateTodo = exports.createTodo = exports.getTodoById = exports.getAllTodos = void 0;
const TodoService = __importStar(require("../services/todo.service"));
const getAllTodos = async (_req, res) => {
    console.log('Fetching all todos');
    const todos = await TodoService.getAll();
    console.log(`Todos fetched: ${todos.length}`); // Corrected line
    res.json(todos);
};
exports.getAllTodos = getAllTodos;
const getTodoById = async (req, res) => {
    console.log(`Fetching todo by ID: ${req.params.id}`);
    const todo = await TodoService.getById(Number(req.params.id));
    if (!todo) {
        console.log('Todo not found');
        return res.status(404).json({ message: 'Todo not found' });
    }
    console.log('Todo found:', todo);
    res.json(todo);
};
exports.getTodoById = getTodoById;
const createTodo = async (req, res) => {
    console.log('Creating new todo with data:', req.body);
    const todo = await TodoService.create(req.body);
    console.log('New todo created:', todo);
    res.status(201).json(todo);
};
exports.createTodo = createTodo;
const updateTodo = async (req, res) => {
    console.log(`Updating todo with ID: ${req.params.id} with data:`, req.body);
    const updated = await TodoService.update(Number(req.params.id), req.body);
    console.log('Updated todo:', updated);
    res.json(updated);
};
exports.updateTodo = updateTodo;
const toggleTodoDone = async (req, res) => {
    console.log(`Toggling done status for todo ID: ${req.params.id}`);
    const updated = await TodoService.toggleDone(Number(req.params.id));
    console.log('Todo updated:', updated);
    res.json(updated);
};
exports.toggleTodoDone = toggleTodoDone;
const deleteTodo = async (req, res) => {
    console.log(`Deleting todo with ID: ${req.params.id}`);
    await TodoService.remove(Number(req.params.id));
    console.log(`Todo with ID ${req.params.id} deleted`);
    res.status(204).send();
};
exports.deleteTodo = deleteTodo;
