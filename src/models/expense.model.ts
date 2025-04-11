export interface Expense {
    id: number;
    title: string;
    amount: number;
    category: string;  // e.g. Food, Rent, Transport
    date: string;      // ISO format
    note?: string;
    createdAt: string;
    updatedAt?: string;
  }
  