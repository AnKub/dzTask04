import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './ordersSlice';
import productsReducer from './productsSlice';
import groupsReducer from './groupsSlice';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsReducer,
    groups: groupsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
