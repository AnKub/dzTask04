import reducer, { addProduct, removeProduct } from './productsSlice';

describe('productsSlice', () => {
  it('removes product by id', () => {
    const initialState = {
      items: [
        {
          id: 'product-1',
          name: 'Монитор Samsung S24F350',
          serialNumber: 'SN123456789',
          number: 101,
          date: '2026-04-20',
          priceUAH: 6500,
          priceUSD: 170,
          status: 'свободен' as const,
          warrantyFrom: '2019-04-06',
          warrantyTo: '2025-04-06',
          condition: 'б/у' as const,
          type: 'монитор',
          specification: '24", FullHD, VA',
          orderId: 'order-1',
          groupId: 'group-1',
        },
      ],
    };

    const nextState = reducer(initialState, removeProduct('product-1'));

    expect(nextState.items).toHaveLength(0);
  });

  it('adds product with provided extra fields', () => {
    const initialState = { items: [] };

    const nextState = reducer(initialState, addProduct({
      groupId: 'group-1',
      orderId: 'order-1',
      name: 'Тестовый продукт',
      serialNumber: 'SN-TEST-1',
      status: 'свободен',
      condition: 'б/у',
      type: 'ноутбук',
      specification: '16GB RAM, 512GB SSD',
      priceUAH: 42000,
      priceUSD: 1000,
      warrantyFrom: '2026-01-01',
      warrantyTo: '2027-01-01',
    }));

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].name).toBe('Тестовый продукт');
    expect(nextState.items[0].condition).toBe('б/у');
    expect(nextState.items[0].type).toBe('ноутбук');
    expect(nextState.items[0].specification).toBe('16GB RAM, 512GB SSD');
    expect(nextState.items[0].priceUAH).toBe(42000);
  });

  it('falls back to defaults for omitted optional fields', () => {
    const initialState = { items: [] };

    const nextState = reducer(initialState, addProduct({
      groupId: 'group-1',
      orderId: 'order-1',
      name: 'Минимальный продукт',
      serialNumber: 'SN-TEST-2',
      status: 'свободен',
    }));

    expect(nextState.items[0].condition).toBe('новый');
    expect(nextState.items[0].type).toBe('добавлен вручную');
    expect(nextState.items[0].specification).toBe('базовая');
  });
});