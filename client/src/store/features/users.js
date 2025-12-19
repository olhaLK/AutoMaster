import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const registerUser = createAsyncThunk(
    'users/register',
    async (payload) => {
        const response = await axios.post('http://localhost:3000/api/register', payload);
        return response.data;
    }
)

export const loginUser = createAsyncThunk(
    'users/login',
    async (payload) => {
        const response = await axios.post('http://localhost:3000/api/login', payload);
        return response.data;
    }
)