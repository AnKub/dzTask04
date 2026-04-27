import { Group } from './group';
import { Order } from './order';
import { Product } from './product';

export interface InventorySnapshot {
  orders: Order[];
  groups: Group[];
  products: Product[];
}