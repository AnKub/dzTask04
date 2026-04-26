import { Product } from '../../types/product';

export interface ProductCardBaseProps {
  product?: Product;
  onDelete?: (id: string) => void;
  groupName?: string;
  orderName?: string;
  orderDate?: string;
  orderId?: string;
  groupCount?: number;
  priceUAH?: number;
  priceUSD?: number;
  showDeleteButton?: boolean;
  onGroupOpen?: (groupId: string) => void;
}

export interface ProductCardStrictProductProps extends ProductCardBaseProps {
  product: Product;
  onDelete: (id: string) => void;
}

export interface ProductCardDefaultViewProps extends ProductCardStrictProductProps {
  isExpanded: boolean;
  showDetailsToggle: boolean;
  onToggleDetails: () => void;
}