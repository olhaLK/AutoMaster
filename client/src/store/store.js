import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './features/cars';
import authReducer from './features/auth';
import testDrivesReducer from './features/testDrives';
import ordersReducer from './features/orders';

//Make a reducers for

/*
1. Cars
2. Users
3. Orders
4. Test Drives
*/

export const store = configureStore({
    reducer: {
        cars: carsReducer,
        auth: authReducer,
        testDrives: testDrivesReducer,
        orders: ordersReducer,
    },
});
