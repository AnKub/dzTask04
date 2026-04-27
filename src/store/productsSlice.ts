import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';

interface AddProductPayload {
  groupId: string;
  orderId: string;
  name: string;
  serialNumber: string;
  status: Product['status'];
  condition?: Product['condition'];
  type?: string;
  specification?: string;
  priceUAH?: number;
  priceUSD?: number;
  warrantyFrom?: string;
  warrantyTo?: string;
}

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter((product) => product.id !== action.payload);
    },
    addProduct(state, action: PayloadAction<AddProductPayload>) {
      const nextNumber = state.items.reduce((max, product) => Math.max(max, product.number), 0) + 1;
      const nextId = `product-${nextNumber}`;
      state.items.push({
        id: nextId,
        number: nextNumber,
        name: action.payload.name,
        serialNumber: action.payload.serialNumber,
        status: action.payload.status,
        date: new Date().toISOString(),
        priceUAH: action.payload.priceUAH ?? 0,
        priceUSD: action.payload.priceUSD ?? 0,
        warrantyFrom: action.payload.warrantyFrom || new Date().toISOString().slice(0, 10),
        warrantyTo: action.payload.warrantyTo || new Date().toISOString().slice(0, 10),
        condition: action.payload.condition ?? 'новый',
        type: action.payload.type?.trim() || 'добавлен вручную',
        specification: action.payload.specification?.trim() || 'базовая',
        orderId: action.payload.orderId,
        groupId: action.payload.groupId,
      });
    },
  },
});

export const { setItems, removeProduct, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
