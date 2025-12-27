import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = 'http://localhost:3000/api/test-drives';

export const createTestDrive = createAsyncThunk(
    'testDrives/create',
    async (data, { rejectWithValue }) => {
        try {
            const sessionId = localStorage.getItem('sessionId');

            const response = await axios.post(API_URL, data, {
                headers: {
                    'x-session-id': sessionId,
                },
            });

            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Error');
        }
    }
)

export const fetchTestDrives = createAsyncThunk(
    'testDrives/fetchAll',
    async () => {
        const response = await axios.get(API_URL);
        return response.data;
    }
)

const testDrivesSlice = createSlice({
    name: 'testDrives',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createTestDrive.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTestDrive.fulfilled, (state, action) => {
                state.loading = false;
                state.list.unshift(action.payload.testDrive);
            })
            .addCase(createTestDrive.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchTestDrives.pending, state => {
                state.loading = true;
            })
            .addCase(fetchTestDrives.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchTestDrives.rejected, state => {
                state.loading = false;
            });
    }
})

export default testDrivesSlice.reducer;
