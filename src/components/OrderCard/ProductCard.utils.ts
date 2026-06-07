import { Product } from '../../types/product';

export const formatSlashDate = (value: string) => {
  const [year, month, day] = value.slice(0, 10).split('-');
  return `${day}/${month}/${year}`;
};

export const getConditionLabel = (condition: Product['condition']) => (condition === 'used' ? 'Б/в' : 'Новий');

export const isRepairStatus = (status: Product['status']) => status === 'inRepair';

export const getStatusLabel = (status: Product['status']) => (status === 'inRepair' ? 'В ремонті' : 'Вільний');