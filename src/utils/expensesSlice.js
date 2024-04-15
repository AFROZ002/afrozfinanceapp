import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [
    
        {
            name: 'Purchased book',
            category: 'Books',
            dateOfExpense: '27 February, 2023',
            amount: 500,
            updatedAt: 'just now',
            createdBy: 'me',
          },
          {
            name: 'CBC Test',
            category: 'Health',
            dateOfExpense: '25 February, 2023',
            amount: 1500,
            updatedAt: '7 hours ago',
            createdBy: 'John D',
          },
          {
            name: 'Boat Earphones',
            category: 'Electronics',
            dateOfExpense: '24 February, 2023',
            amount: 1000,
            updatedAt: '15 hours ago',
            createdBy: 'John D',
          },
          {
            name: 'Delhi Flight',
            category: 'Travel',
            dateOfExpense: '23 February, 2023',
            amount: 5000,
            updatedAt: '1 day ago',
            createdBy: 'me',
          },
          {
            name: 'Bangalore Bus',
            category: 'Travel',
            dateOfExpense: '22 February, 2023',
            amount: 1800,
            updatedAt: '1 day ago',
            createdBy: 'Jacob Jo',
          },
          {
            name: 'Fees',
            category: 'Education',
            dateOfExpense: '21 February, 2023',
            amount: 20000,
            updatedAt: '2 days ago',
            createdBy: 'Smith M',
          },
    // ... rest of the expense objects
  ],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    editExpense: (state, action) => {
      const { id, updatedExpense } = action.payload;
      const index = state.expenses.findIndex((expense) => expense.id === id);
      state.expenses[index] = updatedExpense;
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter((expense) => expense.id !== action.payload.id);
    },
  },
});

export const { addExpense, editExpense, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;