import { Product } from '../../types/product';

export const formatSlashDate = (value: string) => {
  const [year, month, day] = value.slice(0, 10).split('-');
  return `${day}/${month}/${year}`;
};

export const getConditionTranslationKey = (condition: Product['condition']) => (condition === 'used' ? 'productCard.condition.used' : 'productCard.condition.new');

export const isRepairStatus = (status: Product['status']) => status === 'inRepair';

export const getStatusTranslationKey = (status: Product['status']) => (status === 'inRepair' ? 'productCard.status.inRepair' : 'productCard.status.available');