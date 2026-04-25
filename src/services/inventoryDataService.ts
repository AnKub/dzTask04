import { groups } from '../mock/groups';
import { orders } from '../mock/orders';
import { products } from '../mock/products';
import { Group } from '../types/group';
import { Order } from '../types/order';
import { Product } from '../types/product';

const cloneOrders = (): Order[] => orders.map((order) => ({ ...order }));
const cloneGroups = (): Group[] => groups.map((group) => ({ ...group }));
const cloneProducts = (): Product[] => products.map((product) => ({ ...product }));

export const inventoryDataService = {
  getOrders(): Order[] {
    return cloneOrders();
  },

  getGroups(): Group[] {
    return cloneGroups();
  },

  getProducts(): Product[] {
    return cloneProducts();
  },

  getSnapshot() {
    return {
      orders: cloneOrders(),
      groups: cloneGroups(),
      products: cloneProducts(),
    };
  },
};

export default inventoryDataService;