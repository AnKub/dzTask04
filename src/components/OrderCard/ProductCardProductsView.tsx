import React from 'react';
import { ProductCardStrictProductProps } from './ProductCard.types';
import { formatSlashDate, getConditionLabel } from './ProductCard.utils';

const ProductCardProductsView: React.FC<ProductCardStrictProductProps> = ({
  product,
  onDelete,
  groupName,
  orderName,
  orderDate,
}) => (
  <div className="product-card product-card--products">
    <div className="product-card__products-row">
      <span
        className={`product-card__status-indicator product-card__status-indicator--${product.status === 'в ремонте' ? 'repair' : 'free'}`}
        title={product.status}
        aria-label={product.status}
      />
      <span className="product-card__device-icon" aria-hidden="true" />
      <div className="product-card__name-block product-card__name-block--products">
        <span className="product-card__name" title={product.name}>{product.name}</span>
        <span className="product-card__serial">{product.serialNumber}</span>
      </div>
      <div className="product-card__meta-field product-card__meta-field--warranty">
        <span className="product-card__meta-label">с {formatSlashDate(product.warrantyFrom)}</span>
        <span className="product-card__meta-value">по {formatSlashDate(product.warrantyTo)}</span>
      </div>
      <div className="product-card__meta-field product-card__meta-field--condition">
        <span className="product-card__meta-value">{getConditionLabel(product.condition)}</span>
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
        <span className="product-card__meta-label">Группа</span>
        <span className="product-card__meta-value" title={groupName}>{groupName ?? 'Без группы'}</span>
      </div>
      <div className="product-card__meta-field">
        <span className="product-card__meta-label">Приход</span>
        <span className="product-card__meta-value" title={orderName}>{orderName ?? 'Не указан'}</span>
      </div>
      <div className="product-card__meta-field product-card__meta-field--date">
        <span className="product-card__meta-label">Дата прихода</span>
        <span className="product-card__meta-value">{orderDate ? formatSlashDate(orderDate) : formatSlashDate(product.date)}</span>
      </div>
      <button
        className="product-card__delete-btn"
        aria-label="Удалить"
        onClick={() => onDelete(product.id)}
      >
        <span className="product-card__delete-icon" />
      </button>
    </div>
  </div>
);

export default ProductCardProductsView;