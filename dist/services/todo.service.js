"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.toggleDone = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const db_1 = require("../database/db");
const getAll = async () => {
    const db = await (0, db_1.connectDB)();
    return db.all('SELECT * FROM todos ORDER BY createdAt ASC');
};
exports.getAll = getAll;
const getById = async (id) => {
    const db = await (0, db_1.connectDB)();
    return db.get('SELECT * FROM todos WHERE id = ?', id);
};
exports.getById = getById;
const create = async (data) => {
    const db = await (0, db_1.connectDB)();
    const now = new Date().toISOString();
    const { title, description, dueDate } = data;
    const result = await db.run(`INSERT INTO todos (title, description, dueDate, completed, createdAt) VALUES (?, ?, ?, ?, ?)`, title, description ?? '', dueDate ?? '', false, now);
    return {
        id: 1,
        title,
        description,
        dueDate,
        completed: false,
        createdAt: now,
    };
};
exports.create = create;
const update = async (id, data) => {
    const db = await (0, db_1.connectDB)();
    const now = new Date().toISOString();
    await db.run(`UPDATE todos SET title = ?, description = ?, dueDate = ?, updatedAt = ? WHERE id = ?`, data.title, data.description, data.dueDate, now, id);
    return (0, exports.getById)(id);
};
exports.update = update;
const toggleDone = async (id) => {
    const db = await (0, db_1.connectDB)();
    const current = await (0, exports.getById)(id);
    const newStatus = !current?.completed;
    await db.run(`UPDATE todos SET completed = ?, updatedAt = ? WHERE id = ?`, newStatus, new Date().toISOString(), id);
    return (0, exports.getById)(id);
};
exports.toggleDone = toggleDone;
const remove = async (id) => {
    const db = await (0, db_1.connectDB)();
    await db.run('DELETE FROM todos WHERE id = ?', id);
};
exports.remove = remove;
