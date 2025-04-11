"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./database/db");
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
async function createTables() {
    const db = await (0, db_1.connectDB)();
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
