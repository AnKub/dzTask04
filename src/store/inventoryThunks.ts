import { AppDispatch } from './index';
import inventoryApi from '../services/inventoryApi';
import { setItems as setOrders } from './ordersSlice';
import { setItems as setGroups } from './groupsSlice';
import { setItems as setProducts } from './productsSlice';

export const loadInventoryData = (signal?: AbortSignal) => async (dispatch: AppDispatch) => {
  const snapshot = await inventoryApi.getSnapshot(signal);

  if (signal?.aborted) {
    return;
  }

  dispatch(setOrders(snapshot.orders));
  dispatch(setGroups(snapshot.groups));
  dispatch(setProducts(snapshot.products));
};