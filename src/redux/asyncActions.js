import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBook = createAsyncThunk('book/fetchBooks', async (id) => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyDDzSeClJU-xwYRtuZHXCg4YbEiy7-AJe8`,
  );
  return response.data;
});

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ input, category, sortValue, startIndex }) => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${input}+subject:${
        category === 'all' ? '' : category
      }&startIndex=${startIndex}&orderBy=${sortValue}&maxResults=30&key=AIzaSyDDzSeClJU-xwYRtuZHXCg4YbEiy7-AJe8`,
    );
    return response.data;
  },
);

export const getMoreBooks = createAsyncThunk('books/getMoreBooks', async (startIndex, thunkAPI) => {
  const { category, searchValue, sortValue } = thunkAPI.getState().filter;
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${searchValue}+subject:${
      category === 'all' ? '' : category
    }&startIndex=${startIndex}&orderBy=${sortValue}&maxResults=30&key=AIzaSyDDzSeClJU-xwYRtuZHXCg4YbEiy7-AJe8`,
  );
  return response.data;
});
