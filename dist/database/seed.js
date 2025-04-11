"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
async function seedTodos() {
    const db = await (0, db_1.connectDB)();
    const todos = [
        { title: "Buy groceries", description: "Get vegetables, fruits, and dairy products for the week.", dueDate: "2025-04-08T15:00:00Z", completed: false },
        { title: "Doctor appointment", description: "Visit the doctor for an annual checkup.", dueDate: "2025-04-09T10:30:00Z", completed: true },
        { title: "Finish project report", description: "Complete the final draft of the quarterly project report.", dueDate: "2025-04-10T18:00:00Z", completed: false },
        { title: "Call mom", description: "Catch up with mom and check on her health.", dueDate: "2025-04-11T20:00:00Z", completed: true },
        { title: "Pay electricity bill", description: "Pay the monthly electricity bill before the due date.", dueDate: "2025-04-12T12:00:00Z", completed: false },
        { title: "Renew car insurance", description: "Renew the car insurance policy online.", dueDate: "2025-04-13T14:00:00Z", completed: false },
        { title: "Read 'The Great Gatsby'", description: "Finish reading the next chapter of 'The Great Gatsby' for the book club.", dueDate: "2025-04-14T20:00:00Z", completed: false },
        { title: "Plan weekend trip", description: "Look into destinations and book a hotel for the weekend getaway.", dueDate: "2025-04-15T17:00:00Z", completed: true },
        { title: "Check emails", description: "Go through the inbox and respond to urgent emails.", dueDate: "2025-04-16T09:00:00Z", completed: false },
        { title: "Update resume", description: "Add recent work experience and skills to the resume for future opportunities.", dueDate: "2025-04-17T19:00:00Z", completed: true },
        { title: "Prepare for meeting", description: "Get ready for the presentation in the team meeting tomorrow.", dueDate: "2025-04-18T08:00:00Z", completed: false },
        { title: "Submit tax forms", description: "Submit the completed tax forms to the accountant.", dueDate: "2025-04-19T15:00:00Z", completed: false },
        { title: "Workout at the gym", description: "Do a full-body workout at the gym. Focus on strength training.", dueDate: "2025-04-20T06:00:00Z", completed: true },
        { title: "Order birthday gift", description: "Find and order a birthday gift for Sarah.", dueDate: "2025-04-21T16:00:00Z", completed: false },
        { title: "Clean the house", description: "Vacuum and tidy up the house, including the living room and kitchen.", dueDate: "2025-04-22T13:00:00Z", completed: false },
        { title: "Fix broken shelf", description: "Repair the shelf in the living room that has come loose.", dueDate: "2025-04-23T11:00:00Z", completed: false },
        { title: "Book dentist appointment", description: "Schedule an appointment for a dental cleaning and checkup.", dueDate: "2025-04-24T14:00:00Z", completed: true },
        { title: "Clean email inbox", description: "Unsubscribe from unnecessary newsletters and clean up the inbox.", dueDate: "2025-04-25T10:00:00Z", completed: false },
        { title: "Prepare lunch for the week", description: "Cook and pack meals for the week to save time on weekdays.", dueDate: "2025-04-26T12:00:00Z", completed: false }
    ];
    const insertStmt = `
    INSERT INTO todos (title, description, dueDate, completed, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
    // Inserting all todos into the database
    for (const todo of todos) {
        await db.run(insertStmt, [
            todo.title,
            todo.description,
            todo.dueDate,
            todo.completed,
            new Date().toISOString(),
            new Date().toISOString(),
        ]);
    }
    console.log('✅ Seeded todos into the database!');
}
seedTodos().catch((err) => {
    console.error('❌ Error seeding todos: ', err);
});
