import { useMemo } from 'react';
import { Group } from '../types/group';
import { Order } from '../types/order';

const useProductEntityLookups = (groups: Group[], orders: Order[]) => {
  const groupNames = useMemo(
    () => new Map(groups.map((group) => [group.id, group.name])),
    [groups]
  );

  const orderNames = useMemo(
    () => new Map(orders.map((order) => [order.id, order.name])),
    [orders]
  );

  const orderDates = useMemo(
    () => new Map(orders.map((order) => [order.id, order.date])),
    [orders]
  );

  return {
    groupNames,
    orderNames,
    orderDates,
  };
};

export default useProductEntityLookups;