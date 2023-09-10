import { createSlice } from '@reduxjs/toolkit';
import { fetchBook, fetchBooks, getMoreBooks } from './asyncActions';

// export const fetchBook = createAsyncThunk('book/fetchBooks', async (id) => {
//   const response = await axios.get(
//     `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyDDzSeClJU-xwYRtuZHXCg4YbEiy7-AJe8`,
//   );
//   return response.data;
// });

// export const fetchBooks = createAsyncThunk(
//   'books/fetchBooks',
//   async ({ input, category, sortValue, startIndex }) => {
//     const response = await axios.get(
//       `https://www.googleapis.com/books/v1/volumes?q=${input}+subject:${
//         category === 'all' ? '' : category
//       }&startIndex=${startIndex}&orderBy=${sortValue}&maxResults=30&key=AIzaSyDDzSeClJU-xwYRtuZHXCg4YbEiy7-AJe8`,
//     );
//     return response.data;
//   },
// );

// export const getMoreBooks = createAsyncThunk('books/getMoreBooks', async (startIndex, thunkAPI) => {
//   const { category, searchValue, sortValue } = thunkAPI.getState().filter;
//   const response = await axios.get(
//     `https://www.googleapis.com/books/v1/volumes?q=${searchValue}+subject:${
//       category === 'all' ? '' : category
//     }&startIndex=${startIndex}&orderBy=${sortValue}&maxResults=30&key=AIzaSyDDzSeClJU-xwYRtuZHXCg4YbEiy7-AJe8`,
//   );
//   return response.data;
// });

const initialState = {
  items: [],
  book: [],
  remainingTotalItems: null,
  statusBookBlock: 'succeeded',
  statusBookPage: 'succeeded',
  statusGetMoreBooks: 'succeeded',
  totalItems: null,
  haveBooks: false,
};

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.statusBookPage = 'pending';
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.statusBookPage = 'succeeded';
      state.book = action.payload;
    });
    builder.addCase(fetchBook.rejected, (state) => {
      state.statusBookPage = 'error';
      state.book = [];
    });
    builder.addCase(fetchBooks.pending, (state) => {
      state.statusBookBlock = 'pending';
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.statusBookBlock = 'succeeded';
      state.items = action.payload.items;
      state.totalItems = action.payload.totalItems;
      state.haveBooks = true;
    });
    builder.addCase(fetchBooks.rejected, (state) => {
      state.statusBookBlock = 'error';
      state.items = [];
    });
    builder.addCase(getMoreBooks.pending, (state) => {
      state.statusGetMoreBooks = 'pending';
    });
    builder.addCase(getMoreBooks.fulfilled, (state, action) => {
      state.statusGetMoreBooks = 'succeeded';
      if (action.payload.items) {
        state.items = state.items.concat(action.payload.items);
      } else {
        state.haveBooks = false;
      }
    });
    builder.addCase(getMoreBooks.rejected, (state) => {
      state.statusGetMoreBooks = 'error';
      state.items = [];
    });
  },
});

export const { setBooks } = bookSlice.actions;

export default bookSlice.reducer;
