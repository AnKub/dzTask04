import inventoryDataService from './inventoryDataService';

describe('inventoryDataService', () => {
  it('returns cloned products instead of original array reference', () => {
    const firstLoad = inventoryDataService.getProducts();
    const secondLoad = inventoryDataService.getProducts();

    expect(firstLoad).not.toBe(secondLoad);
    expect(firstLoad[0]).not.toBe(secondLoad[0]);
    expect(firstLoad[0]).toEqual(secondLoad[0]);
  });

  it('returns a complete snapshot of orders, groups and products', () => {
    const snapshot = inventoryDataService.getSnapshot();

    expect(snapshot.orders.length).toBeGreaterThan(0);
    expect(snapshot.groups.length).toBeGreaterThan(0);
    expect(snapshot.products.length).toBeGreaterThan(0);
  });
});