export type ProductStatus = 'available' | 'inRepair';
export type ProductCondition = 'new' | 'used';

export interface Product {
  id: string;
  name: string;
  serialNumber: string;
  number: number;
  date: string;
  priceUAH: number;
  priceUSD: number;
  status: ProductStatus;
  warrantyFrom: string;
  warrantyTo: string;
  condition: ProductCondition;
  type: string;
  specification: string;
  orderId: string;
  groupId: string;
}
