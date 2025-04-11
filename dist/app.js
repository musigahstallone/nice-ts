"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Import the CORS package
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const app = (0, express_1.default)();
// Middleware to allow CORS
app.use((0, cors_1.default)());
// Middleware to parse JSON request bodies
app.use(express_1.default.json());
// Log each incoming request (method, url, body)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} - Body:`, req.body);
    next(); // Continue to the next middleware
});
// Your routes
app.use('/api/todos', todo_routes_1.default);
// app.use('/api/expenses', expenseRoutes);
exports.default = app;
