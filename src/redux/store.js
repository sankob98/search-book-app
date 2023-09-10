import { configureStore } from '@reduxjs/toolkit';
import filter from './filterSlice';
import books from './bookSlice';

export const store = configureStore({
  reducer: {
    filter,
    books,
  },
});
