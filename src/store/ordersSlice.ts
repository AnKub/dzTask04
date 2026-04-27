import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../types/order';

interface OrdersState {
  items: Order[];
}

const initialState: OrdersState = {
  items: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Order[]>) {
      state.items = action.payload;
    },
  },
});

export const { setItems } = ordersSlice.actions;
export default ordersSlice.reducer;
