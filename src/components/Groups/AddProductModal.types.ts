export type AddProductFormPayload = {
  name: string;
  serialNumber: string;
  status: 'свободен' | 'в ремонте';
  condition: 'новый' | 'б/у';
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
  status: 'свободен' | 'в ремонте';
  condition: 'новый' | 'б/у';
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
  status: 'свободен',
  condition: 'новый',
  type: '',
  specification: '',
  priceUAH: '',
  priceUSD: '',
  warrantyFrom: '',
  warrantyTo: '',
};