import { AddProductFormErrors, AddProductFormPayload, AddProductFormValues } from './AddProductModal.types';

const hasNegativeNumber = (value: string) => value.trim() !== '' && Number(value) < 0;

export const validateAddProductForm = (values: AddProductFormValues): AddProductFormErrors => {
  const errors: AddProductFormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Название должно содержать минимум 2 символа.';
  }

  if (values.serialNumber.trim().length < 3) {
    errors.serialNumber = 'Серийный номер должен содержать мин 3 символа.';
  }

  if (values.type.trim().length < 2) {
    errors.type = 'Укажите тип продукта.';
  }

  if (values.specification.trim().length < 3) {
    errors.specification = 'Добавьте короткую спецификацию продукта.';
  }

  if (hasNegativeNumber(values.priceUAH)) {
    errors.priceUAH = 'Цена в UAH не может быть отрицательной.';
  }

  if (hasNegativeNumber(values.priceUSD)) {
    errors.priceUSD = 'Цена в USD не может быть отрицательной.';
  }

  if (values.warrantyFrom && !values.warrantyTo) {
    errors.warrantyTo = 'Укажите дату окончания гарантии.';
  }

  if (!values.warrantyFrom && values.warrantyTo) {
    errors.warrantyFrom = 'Укажите дату начала гарантии.';
  }

  if (values.warrantyFrom && values.warrantyTo && values.warrantyTo < values.warrantyFrom) {
    errors.warrantyTo = 'Дата окончания гарантии не может быть раньше даты начала.';
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