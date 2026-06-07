import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProductCardStrictProductProps } from './ProductCard.types';
import { getStatusTranslationKey, isRepairStatus } from './ProductCard.utils';

const ProductCardGroupsView: React.FC<ProductCardStrictProductProps> = ({ product, onDelete }) => {
  const { t } = useTranslation();
  const statusLabel = t(getStatusTranslationKey(product.status));

  return (
    <div className="product-card product-card--groups">
      <div className="product-card__groups-row">
        <span
          className={`product-card__status-indicator product-card__status-indicator--${isRepairStatus(product.status) ? 'repair' : 'free'}`}
          title={statusLabel}
          aria-label={statusLabel}
        />
        <span className="product-card__device-icon" aria-hidden="true" />
        <div className="product-card__name-block product-card__name-block--groups">
          <span className="product-card__name" title={product.name}>{product.name}</span>
          <span className="product-card__serial">{product.serialNumber}</span>
        </div>
        <div className="product-card__meta-field product-card__meta-field--status-word">
          <span className={`product-card__status-word product-card__status-word--${isRepairStatus(product.status) ? 'repair' : 'free'}`}>
            {statusLabel}
          </span>
        </div>
        <button
          className="product-card__delete-btn"
          aria-label={t('productCard.delete')}
          onClick={() => onDelete(product.id)}
        >
          <span className="product-card__delete-icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductCardGroupsView;