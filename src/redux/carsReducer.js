import { createSlice } from '@reduxjs/toolkit';
import { getCarsThunk } from './thunks';

const initialState = {
  carsData: [],
  isLoading: false,
  error: null,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(getCarsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCarsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carsData = action.payload;
      })
      .addCase(getCarsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const carsReducer = carsSlice.reducer;
