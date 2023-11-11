import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const $instance = axios.create({
  baseURL: 'https://654f0e85358230d8f0ccfaf1.mockapi.io',
});

export const getCarsThunk = createAsyncThunk(
  'request/cars',
  async (_, thunkAPI) => {
    try {
      const { data } = await $instance.get('/advert');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
