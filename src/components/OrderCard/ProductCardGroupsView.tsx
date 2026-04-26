import React from 'react';
import { ProductCardStrictProductProps } from './ProductCard.types';

const ProductCardGroupsView: React.FC<ProductCardStrictProductProps> = ({ product, onDelete }) => (
  <div className="product-card product-card--groups">
    <div className="product-card__groups-row">
      <span
        className={`product-card__status-indicator product-card__status-indicator--${product.status === 'в ремонте' ? 'repair' : 'free'}`}
        title={product.status}
        aria-label={product.status}
      />
      <span className="product-card__device-icon" aria-hidden="true" />
      <div className="product-card__name-block product-card__name-block--groups">
        <span className="product-card__name" title={product.name}>{product.name}</span>
        <span className="product-card__serial">{product.serialNumber}</span>
      </div>
      <div className="product-card__meta-field product-card__meta-field--status-word">
        <span className={`product-card__status-word product-card__status-word--${product.status === 'в ремонте' ? 'repair' : 'free'}`}>
          {product.status}
        </span>
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

export default ProductCardGroupsView;