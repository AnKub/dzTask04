import { AddProductFormErrors, AddProductFormPayload, AddProductFormValues } from './AddProductModal.types';

const hasNegativeNumber = (value: string) => value.trim() !== '' && Number(value) < 0;

export const validateAddProductForm = (values: AddProductFormValues): AddProductFormErrors => {
  const errors: AddProductFormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'addProductModal.validation.nameMin';
  }

  if (values.serialNumber.trim().length < 3) {
    errors.serialNumber = 'addProductModal.validation.serialNumberMin';
  }

  if (values.type.trim().length < 2) {
    errors.type = 'addProductModal.validation.typeRequired';
  }

  if (values.specification.trim().length < 3) {
    errors.specification = 'addProductModal.validation.specificationMin';
  }

  if (hasNegativeNumber(values.priceUAH)) {
    errors.priceUAH = 'addProductModal.validation.priceUAHNonNegative';
  }

  if (hasNegativeNumber(values.priceUSD)) {
    errors.priceUSD = 'addProductModal.validation.priceUSDNonNegative';
  }

  if (values.warrantyFrom && !values.warrantyTo) {
    errors.warrantyTo = 'addProductModal.validation.warrantyToRequired';
  }

  if (!values.warrantyFrom && values.warrantyTo) {
    errors.warrantyFrom = 'addProductModal.validation.warrantyFromRequired';
  }

  if (values.warrantyFrom && values.warrantyTo && values.warrantyTo < values.warrantyFrom) {
    errors.warrantyTo = 'addProductModal.validation.warrantyToAfterFrom';
  }

  return errors;
};

export const mapValuesToPayload = (values: AddProductFormValues): AddProductFormPayload => ({
  name: values.name.trim(),
  serialNumber: values.serialNumber.trim(),
  status: values.status,
  condition: values.condition,
  type: values.type.trim(),
  specification: values.specification.trim(),
  priceUAH: Number(values.priceUAH) || 0,
  priceUSD: Number(values.priceUSD) || 0,
  warrantyFrom: values.warrantyFrom,
  warrantyTo: values.warrantyTo,
});