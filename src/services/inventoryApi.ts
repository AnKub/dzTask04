import { InventorySnapshot } from '../types/inventory';

const INVENTORY_ENDPOINT = `${process.env.PUBLIC_URL || ''}/api/inventory.json`;

const cloneSnapshot = (snapshot: InventorySnapshot): InventorySnapshot => ({
  orders: snapshot.orders.map((order) => ({ ...order })),
  groups: snapshot.groups.map((group) => ({ ...group })),
  products: snapshot.products.map((product) => ({ ...product })),
});

export const inventoryApi = {
  async getSnapshot(): Promise<InventorySnapshot> {
    const response = await fetch(INVENTORY_ENDPOINT);

    if (!response.ok) {
      throw new Error(`Failed to load inventory data: ${response.status}`);
    }

    const snapshot = await response.json() as InventorySnapshot;
    return cloneSnapshot(snapshot);
  },
};

export default inventoryApi;