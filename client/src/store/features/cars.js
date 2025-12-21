import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch cars from an API
export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
    const { data } = await axios.get('http://localhost:3000/api/cars');
    return data;
});
export const PostCar = createAsyncThunk('cars/PostCar', async (newCar) => {
    const { data } = await axios.post('http://localhost:3000/api/cars', newCar);
    return data;
});
export const DeleteCar = createAsyncThunk('cars/deleteCar', async (id) => {
    await axios.delete(`http://localhost:3000/api/cars/${id}`);
    return id;
});
export const UpdateCar = createAsyncThunk('cars/updateCar', async (car) => {
    const { data } = await axios.put(`http://localhost:3000/api/cars/${car._id}`, car);
    return data;
})

const carsSlice = createSlice({
    name: 'cars',
    initialState: {
        carsList: [],
        status: 'idle',
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.carsList = action.payload;
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(PostCar.fulfilled, (state, action) => {
                state.carsList.push(action.payload);
            })
            .addCase(DeleteCar.fulfilled, (state, action) => {
                state.carsList = state.carsList.filter(car => car._id !== action.payload);
            })
            .addCase(UpdateCar.fulfilled, (state, action) => {
                const index = state.carsList.findIndex(car => car._id === action.payload._id);
                if (index !== -1) {
                    state.carsList[index] = action.payload;
                }
            });
    },
});

export default carsSlice.reducer;






