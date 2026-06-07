import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProductCardStrictProductProps } from './ProductCard.types';
import { formatSlashDate, getConditionTranslationKey, getStatusTranslationKey, isRepairStatus } from './ProductCard.utils';

const ProductCardProductsView: React.FC<ProductCardStrictProductProps> = ({
  product,
  onDelete,
  groupName,
  orderName,
  orderDate,
}) => {
  const { t } = useTranslation();
  const statusLabel = t(getStatusTranslationKey(product.status));

  return (
    <div className="product-card product-card--products">
      <div className="product-card__products-row">
        <span
          className={`product-card__status-indicator product-card__status-indicator--${isRepairStatus(product.status) ? 'repair' : 'free'}`}
          title={statusLabel}
          aria-label={statusLabel}
        />
        <span className="product-card__device-icon" aria-hidden="true" />
        <div className="product-card__name-block product-card__name-block--products">
          <span className="product-card__name" title={product.name}>{product.name}</span>
          <span className="product-card__serial">{product.serialNumber}</span>
        </div>
        <div className="product-card__meta-field product-card__meta-field--warranty">
          <span className="product-card__meta-label">{t('productCard.warrantyFrom')} {formatSlashDate(product.warrantyFrom)}</span>
          <span className="product-card__meta-value">{t('productCard.warrantyTo')} {formatSlashDate(product.warrantyTo)}</span>
        </div>
        <div className="product-card__meta-field product-card__meta-field--condition">
          <span className="product-card__meta-value">{t(getConditionTranslationKey(product.condition))}</span>
        </div>
        <div className="product-card__price product-card__price--products">
          <span className="product-card__price-usd">
            ${product.priceUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </span>
          <span className="product-card__price-uah">
            {product.priceUAH.toLocaleString('uk-UA', { style: 'currency', currency: 'UAH', minimumFractionDigits: 0 })}
          </span>
        </div>
        <div className="product-card__meta-field">
          <span className="product-card__meta-label">{t('productCard.group')}</span>
          <span className="product-card__meta-value" title={groupName}>{groupName ?? t('productCard.noGroup')}</span>
        </div>
        <div className="product-card__meta-field">
          <span className="product-card__meta-label">{t('productCard.order')}</span>
          <span className="product-card__meta-value" title={orderName}>{orderName ?? t('productCard.noOrder')}</span>
        </div>
        <div className="product-card__meta-field product-card__meta-field--date">
          <span className="product-card__meta-label">{t('productCard.orderDate')}</span>
          <span className="product-card__meta-value">{orderDate ? formatSlashDate(orderDate) : formatSlashDate(product.date)}</span>
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

export default ProductCardProductsView;