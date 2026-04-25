export type ProductStatus = 'свободен' | 'в ремонте';
export type ProductCondition = 'новый' | 'б/у';

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
