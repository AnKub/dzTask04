import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/OrderCard/ProductCard';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import useDeleteProductModal from '../../hooks/useDeleteProductModal';
import useProductEntityLookups from '../../hooks/useProductEntityLookups';
import { useAppSelector } from '../../store/hooks';
import './Orders.scss';

const Orders: React.FC = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const products = useAppSelector((state) => state.products.items);
  const groups = useAppSelector((state) => state.groups.items);
  const orders = useAppSelector((state) => state.orders.items);
  const { deleteId, requestDelete, closeDeleteModal, confirmDelete, confirmText } = useDeleteProductModal(products);
  const { groupNames, orderNames, orderDates } = useProductEntityLookups(groups, orders);
  const debouncedGlobalQuery = useDebouncedValue((searchParams.get('q') ?? '').trim().toLowerCase(), 350);

  const productsByOrderId = useMemo(
    () => products.reduce((groupsMap, product) => {
      const currentProducts = groupsMap.get(product.orderId) ?? [];
      currentProducts.push(product);
      groupsMap.set(product.orderId, currentProducts);
      return groupsMap;
    }, new Map<string, typeof products>()),
    [products]
  );

  const filteredOrders = useMemo(
    () => orders.filter((order) => {
      if (!debouncedGlobalQuery) {
        return true;
      }

      const orderProducts = productsByOrderId.get(order.id) ?? [];
      const searchableText = [
        order.name,
        order.date,
        ...orderProducts.flatMap((product) => [
          product.name,
          product.serialNumber,
          product.type,
          product.specification,
          groupNames.get(product.groupId) ?? '',
        ]),
      ].join(' ').toLowerCase();

      return searchableText.includes(debouncedGlobalQuery);
    }),
    [debouncedGlobalQuery, groupNames, orders, productsByOrderId]
  );

  const orderSummaries = useMemo(
    () => new Map(orders.map((order) => {
      const orderProducts = productsByOrderId.get(order.id) ?? [];

      return [
        order.id,
        {
          count: orderProducts.length,
          totalPriceUSD: orderProducts.reduce((total, product) => total + product.priceUSD, 0),
          totalPriceUAH: orderProducts.reduce((total, product) => total + product.priceUAH, 0),
        },
      ];
    })),
    [orders, productsByOrderId]
  );

  const selectedOrder = useMemo(
    () => orders.find((order) => order.id === selectedOrderId) ?? null,
    [orders, selectedOrderId]
  );

  const selectedOrderProducts = useMemo(
    () => (selectedOrderId ? (productsByOrderId.get(selectedOrderId) ?? []).filter((product) => {
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
    }) : []),
    [debouncedGlobalQuery, groupNames, orderNames, productsByOrderId, selectedOrderId]
  );

  return (
    <section className="orders-page">
      <div className="orders-page__header">
        <div className="orders-page__title">
          <span className="orders-page__title-badge">+</span>
          <span>{selectedOrder ? `Приход: ${selectedOrder.name}` : `Приходы / ${filteredOrders.length}`}</span>
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
                  onDelete={requestDelete}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="orders-page__list">
            {filteredOrders.map((order) => {
              const orderSummary = orderSummaries.get(order.id);

              return (
              <ProductCard
                key={order.id}
                orderId={order.id}
                orderName={order.name}
                orderDate={order.date}
                groupCount={orderSummary?.count ?? 0}
                priceUSD={orderSummary?.totalPriceUSD ?? 0}
                priceUAH={orderSummary?.totalPriceUAH ?? 0}
                variant="orders"
                onGroupOpen={(orderId) => setSelectedOrderId(orderId)}
                showDeleteButton={false}
              />
              );
            })}
          </div>
        )}
      </div>
      <ConfirmModal
        open={!!deleteId}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        text={confirmText}
      />
    </section>
  );
};

export default Orders;
