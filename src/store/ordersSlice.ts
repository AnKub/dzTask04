import { createSlice } from '@reduxjs/toolkit';
import inventoryDataService from '../services/inventoryDataService';
import { Order } from '../types/order';

interface OrdersState {
  items: Order[];
}

const initialState: OrdersState = {
  items: inventoryDataService.getOrders(),
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
});

export default ordersSlice.reducer;
