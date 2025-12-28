import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTestDrives = createAsyncThunk(
    'testDrives/fetchAll',
    async () => {
        const res = await axios.get('http://localhost:3000/api/test-drives');
        return res.data;
    }
);

const testDrivesSlice = createSlice({
    name: 'testDrives',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestDrives.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTestDrives.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchTestDrives.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default testDrivesSlice.reducer;
