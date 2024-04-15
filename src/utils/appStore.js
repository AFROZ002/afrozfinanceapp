import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './expensesSlice';
import userReducer from './userSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    expenses: expensesReducer,
  },
});

export default appStore;