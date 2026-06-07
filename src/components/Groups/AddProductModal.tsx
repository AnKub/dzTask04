import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import {
  AddProductFormPayload,
  AddProductFormValues,
  initialAddProductFormValues,
} from './AddProductModal.types';
import { mapValuesToPayload, validateAddProductForm } from './AddProductModal.validation';
import './AddProductModal.scss';

interface AddProductModalProps {
  open: boolean;
  groupName: string;
  onClose: () => void;
  onSubmit: (payload: AddProductFormPayload) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ open, groupName, onClose, onSubmit }) => {
  const [values, setValues] = useState<AddProductFormValues>(initialAddProductFormValues);
  const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof AddProductFormValues, boolean>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useTranslation();
  const errors = useMemo(() => validateAddProductForm(values), [values]);
  const isValid = Object.keys(errors).length === 0;

  if (!open) return null;

  const resetForm = () => {
    setValues(initialAddProductFormValues);
    setTouchedFields({});
    setIsSubmitted(false);
  };

  const updateField = <FieldName extends keyof AddProductFormValues>(fieldName: FieldName, value: AddProductFormValues[FieldName]) => {
    setValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));
  };

  const handleFieldBlur = (fieldName: keyof AddProductFormValues) => {
    setTouchedFields((currentTouchedFields) => ({
      ...currentTouchedFields,
      [fieldName]: true,
    }));
  };

  const isFieldInvalid = (fieldName: keyof AddProductFormValues) => Boolean(errors[fieldName] && (touchedFields[fieldName] || isSubmitted));

  const getFieldError = (fieldName: keyof AddProductFormValues) => {
    const errorKey = errors[fieldName];

    return isFieldInvalid(fieldName) && errorKey ? t(errorKey) : '';
  };

  const getFieldClassName = (fieldName: keyof AddProductFormValues, baseClassName: 'form-control' | 'form-select') => {
    return `${baseClassName}${isFieldInvalid(fieldName) ? ' is-invalid' : ''}`;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    setTouchedFields({
      name: true,
      serialNumber: true,
      type: true,
      specification: true,
      priceUAH: true,
      priceUSD: true,
      warrantyFrom: true,
      warrantyTo: true,
    });

    if (!isValid) return;

    onSubmit(mapValuesToPayload(values));
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const modalContent = (
    <div className="add-product-modal__backdrop" onClick={handleClose}>
      <form className="add-product-modal" onClick={(event) => event.stopPropagation()} onSubmit={handleSubmit}>
        <div className="add-product-modal__header">
          <span>{t('addProductModal.title', { groupName })}</span>
          <button className="add-product-modal__close" type="button" onClick={handleClose} aria-label={t('addProductModal.close')}>×</button>
        </div>
        <div className="add-product-modal__body">
          <label className="add-product-modal__field">
            <span>{t('addProductModal.fields.name')}</span>
            <input
              className={getFieldClassName('name', 'form-control')}
              value={values.name}
              onChange={(event) => updateField('name', event.target.value)}
              onBlur={() => handleFieldBlur('name')}
              aria-invalid={isFieldInvalid('name')}
            />
            <span className="add-product-modal__error">{getFieldError('name')}</span>
          </label>
          <label className="add-product-modal__field">
            <span>{t('addProductModal.fields.serialNumber')}</span>
            <input
              className={getFieldClassName('serialNumber', 'form-control')}
              value={values.serialNumber}
              onChange={(event) => updateField('serialNumber', event.target.value)}
              onBlur={() => handleFieldBlur('serialNumber')}
              aria-invalid={isFieldInvalid('serialNumber')}
            />
            <span className="add-product-modal__error">{getFieldError('serialNumber')}</span>
          </label>
          <label className="add-product-modal__field">
            <span>{t('addProductModal.fields.type')}</span>
            <input
              className={getFieldClassName('type', 'form-control')}
              value={values.type}
              onChange={(event) => updateField('type', event.target.value)}
              onBlur={() => handleFieldBlur('type')}
              placeholder={t('addProductModal.placeholders.type')}
              aria-invalid={isFieldInvalid('type')}
            />
            <span className="add-product-modal__error">{getFieldError('type')}</span>
          </label>
          <label className="add-product-modal__field add-product-modal__field--wide">
            <span>{t('addProductModal.fields.specification')}</span>
            <input
              className={getFieldClassName('specification', 'form-control')}
              value={values.specification}
              onChange={(event) => updateField('specification', event.target.value)}
              onBlur={() => handleFieldBlur('specification')}
              placeholder={t('addProductModal.placeholders.specification')}
              aria-invalid={isFieldInvalid('specification')}
            />
            <span className="add-product-modal__error">{getFieldError('specification')}</span>
          </label>
          <label className="add-product-modal__field">
            <span>{t('addProductModal.fields.status')}</span>
            <select className="form-select" value={values.status} onChange={(event) => updateField('status', event.target.value as AddProductFormValues['status'])}>
              <option value="available">{t('addProductModal.status.available')}</option>
              <option value="inRepair">{t('addProductModal.status.inRepair')}</option>

          </select>
          </label>
          <label className="add-product-modal__field">
            <span>{t('addProductModal.fields.condition')}</span>
            <select className="form-select" value={values.condition} onChange={(event) => updateField('condition', event.target.value as AddProductFormValues['condition'])}>
              <option value="new">{t('addProductModal.condition.new')}</option>
              <option value="used">{t('addProductModal.condition.used')}</option>
            </select>
          </label>
          <label className="add-product-modal__field">
            <span>{t('addProductModal.fields.priceUAH')}</span>
            <input
              className={getFieldClassName('priceUAH', 'form-control')}
              type="number"
              min="0"
              step="1"
              value={values.priceUAH}
              onChange={(event) => updateField('priceUAH', event.target.value)}
              onBlur={() => handleFieldBlur('priceUAH')}
              aria-invalid={isFieldInvalid('priceUAH')}
            />
            <span className="add-product-modal__error">{getFieldError('priceUAH')}</span>
          </label>
          <label className="add-product-modal__field">
            <span>{t('addProductModal.fields.priceUSD')}</span>
            <input
              className={getFieldClassName('priceUSD', 'form-control')}
              type="number"
              min="0"
              step="1"
              value={values.priceUSD}
              onChange={(event) => updateField('priceUSD', event.target.value)}
              onBlur={() => handleFieldBlur('priceUSD')}
              aria-invalid={isFieldInvalid('priceUSD')}
            />
            <span className="add-product-modal__error">{getFieldError('priceUSD')}</span>
          </label>
          <label className="add-product-modal__field">
            <span>{t('addProductModal.fields.warrantyFrom')}</span>
            <input
              className={getFieldClassName('warrantyFrom', 'form-control')}
              type="date"
              value={values.warrantyFrom}
              onChange={(event) => updateField('warrantyFrom', event.target.value)}
              onBlur={() => handleFieldBlur('warrantyFrom')}
              aria-invalid={isFieldInvalid('warrantyFrom')}
            />
            <span className="add-product-modal__error">{getFieldError('warrantyFrom')}</span>
          </label>
          <label className="add-product-modal__field">
            <span>{t('addProductModal.fields.warrantyTo')}</span>
            <input
              className={getFieldClassName('warrantyTo', 'form-control')}
              type="date"
              value={values.warrantyTo}
              onChange={(event) => updateField('warrantyTo', event.target.value)}
              onBlur={() => handleFieldBlur('warrantyTo')}
              aria-invalid={isFieldInvalid('warrantyTo')}
            />
            <span className="add-product-modal__error">{getFieldError('warrantyTo')}</span>
          </label>
        </div>
        <div className="add-product-modal__actions">
          <button className="btn btn-outline-secondary" type="button" onClick={handleClose}>
            {t('addProductModal.actions.cancel')}
          </button>
          <button className="btn btn-success" type="submit" disabled={!isValid}>
            {t('addProductModal.actions.submit')}
          </button>
        </div>
      </form>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default AddProductModal;
