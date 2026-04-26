import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/OrderCard/ProductCard';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeProduct } from '../../store/productsSlice';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import { Product } from '../../types/product';
import { Group } from '../../types/group';
import { Order } from '../../types/order';
import './Orders.scss';

const Orders: React.FC = () => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const groups = useAppSelector((state) => state.groups.items);
  const orders = useAppSelector((state) => state.orders.items);
  const debouncedGlobalQuery = useDebouncedValue((searchParams.get('q') ?? '').trim().toLowerCase(), 350);

  const groupNames = useMemo(
    () => new Map(groups.map((group: Group) => [group.id, group.name])),
    [groups]
  );
  const orderNames = useMemo(
    () => new Map(orders.map((order: Order) => [order.id, order.name])),
    [orders]
  );
  const orderDates = useMemo(
    () => new Map(orders.map((order: Order) => [order.id, order.date])),
    [orders]
  );
  const orderProductCounts = useMemo(
    () => products.reduce((counts, product) => {
      counts.set(product.orderId, (counts.get(product.orderId) ?? 0) + 1);
      return counts;
    }, new Map<string, number>()),
    [products]
  );

  const filtered = useMemo(
    () => products.filter((product: Product) => {
      if (!debouncedGlobalQuery) {
        return true;
      }

      const searchableText = [
        product.name,
        product.serialNumber,
        product.type,
        product.specification,
        groupNames.get(product.groupId) ?? '',
        orderNames.get(product.orderId) ?? '',
      ].join(' ').toLowerCase();

      return searchableText.includes(debouncedGlobalQuery);
    }),
    [debouncedGlobalQuery, groupNames, orderNames, products]
  );

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };
  const handleConfirmDelete = () => {
    if (deleteId) dispatch(removeProduct(deleteId));
    setDeleteId(null);
  };
  const handleCloseModal = () => setDeleteId(null);

  const selectedOrder = useMemo(
    () => orders.find((order) => order.id === selectedOrderId) ?? null,
    [orders, selectedOrderId]
  );

  const selectedOrderProducts = useMemo(
    () => (selectedOrderId ? filtered.filter((product) => product.orderId === selectedOrderId) : []),
    [filtered, selectedOrderId]
  );

  const deleteProduct = useMemo(
    () => products.find((product) => product.id === deleteId) ?? null,
    [deleteId, products]
  );

  return (
    <section className="orders-page">
      <div className="orders-page__header">
        <div className="orders-page__title">
          <span className="orders-page__title-badge">+</span>
          <span>{selectedOrder ? `Приход: ${selectedOrder.name}` : `Приходы / ${filtered.length}`}</span>
        </div>
      </div>
      <div className="orders-page__stage" key={selectedOrderId ?? 'orders-list'}>
        {selectedOrder ? (
          <>
            <div className="orders-page__toolbar">
              <button
                type="button"
                className="orders-page__back-btn"
                onClick={() => setSelectedOrderId(null)}
                aria-label="Вернуться к списку приходов"
              >
                <span className="orders-page__back-icon" aria-hidden="true" />
              </button>
              <div className="orders-page__summary">
                <span>{selectedOrderProducts.length} товаров</span>
                <span>{selectedOrderProducts.reduce((total, product) => total + product.priceUSD, 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USD</span>
                <span>{selectedOrderProducts.reduce((total, product) => total + product.priceUAH, 0).toLocaleString('uk-UA', { style: 'currency', currency: 'UAH', minimumFractionDigits: 0 })}</span>
              </div>
            </div>
            <div className="orders-page__products">
              {selectedOrderProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  groupName={groupNames.get(product.groupId)}
                  orderName={orderNames.get(product.orderId)}
                  orderDate={orderDates.get(product.orderId)}
                  variant="products"
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="orders-page__list">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                groupName={groupNames.get(product.groupId)}
                orderName={orderNames.get(product.orderId)}
                orderDate={orderDates.get(product.orderId)}
                groupCount={orderProductCounts.get(product.orderId)}
                variant="orders"
                onGroupOpen={(orderId) => setSelectedOrderId(orderId)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
      <ConfirmModal
        open={!!deleteId}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        text={deleteProduct ? `Вы действительно хотите удалить продукт "${deleteProduct.name}"?` : undefined}
      />
    </section>
  );
};

export default Orders;
