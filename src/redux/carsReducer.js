import { createSlice } from '@reduxjs/toolkit';
import { getAllCarsThunk, getCarsThunk } from './thunks';

const initialState = {
  carsData: [],
  carsDataFilter: [],
  favorites: [],
  isLoading: false,
  error: null,
  brandFilter: '',
  priceFilter: '',
  millegeOneValue: 0,
  millegeTwoValue: 0,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setBrandFilter: (state, action) => {
      state.brandFilter = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
    },
    setMillegeOne: (state, action) => {
      state.millegeOneValue = Number(action.payload);
    },
    setMillegeTwo: (state, action) => {
      state.millegeTwoValue = Number(action.payload);
    },
    setFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    deleteFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        item => item.id !== action.payload.id
      );
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getCarsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCarsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const newCars = action.payload;
        const uniqueNewCars = newCars.filter(newCar => {
          return !state.carsData.some(
            existingCar => existingCar.id === newCar.id
          );
        });
        state.carsData.push(...uniqueNewCars);
      })
      .addCase(getCarsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllCarsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCarsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carsDataFilter = action.payload;
      })
      .addCase(getAllCarsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { setBrandFilter } = carsSlice.actions;
export const { setPriceFilter } = carsSlice.actions;
export const { setMillegeOne } = carsSlice.actions;
export const { setMillegeTwo } = carsSlice.actions;
export const { setFavorites } = carsSlice.actions;
export const { deleteFavorites } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
