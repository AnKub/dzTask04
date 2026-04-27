import { AppDispatch } from './index';
import inventoryApi from '../services/inventoryApi';
import { setItems as setOrders } from './ordersSlice';
import { setItems as setGroups } from './groupsSlice';
import { setItems as setProducts } from './productsSlice';

export const loadInventoryData = () => async (dispatch: AppDispatch) => {
  const snapshot = await inventoryApi.getSnapshot();

  dispatch(setOrders(snapshot.orders));
  dispatch(setGroups(snapshot.groups));
  dispatch(setProducts(snapshot.products));
};