import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'all',
  sortValue: 'relevance',
  searchValue: '',
  startIndex: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sortValue = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setStartIndex: (state, action) => {
      state.startIndex = action.payload;
    },
  },
});

export const { setCategory, setSort, setSearchValue, setStartIndex } = filterSlice.actions;

export default filterSlice.reducer;
