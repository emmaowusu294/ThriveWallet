// src/data/mockData.js

export const currentUser = {
  name: "Emmanuel",
  currency: "GH₵",
};

export const mockWallets = [
  {
    id: "w1",
    name: "MTN Mobile Money",
    type: "momo",
    balance: 850.0,
    color: "bg-yellow-400",
  },
  {
    id: "w2",
    name: "GT Bank",
    type: "bank",
    balance: 3400.0,
    color: "bg-orange-500",
  },
  {
    id: "w3",
    name: "Cash",
    type: "cash",
    balance: 150.0,
    color: "bg-emerald-500",
  },
];

export const mockTransactions = [
  {
    id: "t1",
    desc: "Bolt Ride to Campus",
    amount: 45,
    type: "expense",
    date: "Today, 8:30 AM",
    category: "Transport",
  },
  {
    id: "t2",
    desc: "Freelance UI Design",
    amount: 1500,
    type: "income",
    date: "Yesterday",
    category: "Income",
  },
  {
    id: "t3",
    desc: "Late Night Waakye",
    amount: 35,
    type: "expense",
    date: "Yesterday",
    category: "Food",
  },
  {
    id: "t4",
    desc: "Spotify Premium Student",
    amount: 20,
    type: "expense",
    date: "Jun 5",
    category: "Subscriptions",
  },
  {
    id: "t5",
    desc: "MTN Data Bundle",
    amount: 50,
    type: "expense",
    date: "Jun 3",
    category: "Utilities",
  },
];

// Data formatted specifically for the Recharts library
export const chartData = [
  { day: "Mon", spent: 120 },
  { day: "Tue", spent: 80 },
  { day: "Wed", spent: 45 },
  { day: "Thu", spent: 200 },
  { day: "Fri", spent: 55 },
  { day: "Sat", spent: 35 },
  { day: "Sun", spent: 90 },
];

export const mockCategories = [
  { id: "cat1", name: "Food & Drink", type: "expense" },
  { id: "cat2", name: "Transport", type: "expense" },
  { id: "cat3", name: "Subscriptions", type: "expense" },
  { id: "cat4", name: "Freelance", type: "income" },
  { id: "cat5", name: "Salary", type: "income" },
];
