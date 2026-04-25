import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
  const groupCounts = useMemo(
    () => products.reduce((counts, product) => {
      counts.set(product.groupId, (counts.get(product.groupId) ?? 0) + 1);
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

  return (
    <section className="orders-page">
      <div className="orders-page__header">
        <div className="orders-page__title">
          <span className="orders-page__title-badge">+</span>
          <span>Приходы / {filtered.length}</span>
        </div>
      </div>
      <div className="orders-page__list">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            groupName={groupNames.get(product.groupId)}
            orderName={orderNames.get(product.orderId)}
            orderDate={orderDates.get(product.orderId)}
            groupCount={groupCounts.get(product.groupId)}
            variant="orders"
            onGroupOpen={(groupId) => navigate(`/groups?groupId=${groupId}`)}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <ConfirmModal
        open={!!deleteId}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
};

export default Orders;
