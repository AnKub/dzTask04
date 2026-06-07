export type ProductStatus = 'available' | 'inRepair';
export type ProductCondition = 'new' | 'used';

export type AddProductFormPayload = {
  name: string;
  serialNumber: string;
  status: ProductStatus;
  condition: ProductCondition;
  type: string;
  specification: string;
  priceUAH: number;
  priceUSD: number;
  warrantyFrom: string;
  warrantyTo: string;
};

export type AddProductFormValues = {
  name: string;
  serialNumber: string;
  status: ProductStatus;
  condition: ProductCondition;
  type: string;
  specification: string;
  priceUAH: string;
  priceUSD: string;
  warrantyFrom: string;
  warrantyTo: string;
};

export type AddProductFormErrors = Partial<Record<keyof AddProductFormValues, string>>;

export const initialAddProductFormValues: AddProductFormValues = {
  name: '',
  serialNumber: '',
  status: 'available',
  condition: 'new',
  type: '',
  specification: '',
  priceUAH: '',
  priceUSD: '',
  warrantyFrom: '',
  warrantyTo: '',
};