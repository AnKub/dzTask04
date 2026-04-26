import { Product } from '../../types/product';

export const formatSlashDate = (value: string) => {
  const [year, month, day] = value.slice(0, 10).split('-');
  return `${day}/${month}/${year}`;
};

export const getConditionLabel = (condition: Product['condition']) => (condition === 'б/у' ? 'Б/У' : 'Новый');