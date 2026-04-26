import React from 'react';
import { ProductCardBaseProps } from './ProductCard.types';
import { formatSlashDate } from './ProductCard.utils';

const ProductCardOrdersView: React.FC<ProductCardBaseProps> = ({
  product,
  onDelete,
  orderName,
  orderDate,
  orderId,
  groupCount,
  priceUAH,
  priceUSD,
  showDeleteButton = true,
  onGroupOpen,
}) => {
  const resolvedOrderId = orderId ?? product?.orderId;
  const resolvedOrderName = orderName ?? product?.name ?? 'Приход';
  const resolvedOrderDate = orderDate ?? product?.date;
  const resolvedPriceUSD = priceUSD ?? product?.priceUSD ?? 0;
  const resolvedPriceUAH = priceUAH ?? product?.priceUAH ?? 0;

  return (
    <div className="product-card product-card--orders">
      <div className="product-card__orders-row">
        <div className="product-card__name-block product-card__name-block--orders">
          <span className="product-card__name" title={resolvedOrderName}>{resolvedOrderName}</span>
        </div>
        <button
          className="product-card__group-link"
          type="button"
          aria-label={resolvedOrderName ? `Открыть товары прихода ${resolvedOrderName}` : 'Открыть товары прихода'}
          onClick={() => resolvedOrderId && onGroupOpen?.(resolvedOrderId)}
        >
          <span className="product-card__group-link-icon" aria-hidden="true" />
          <span className="product-card__group-link-count">{groupCount ?? 0}</span>
        </button>
        <div className="product-card__meta-field product-card__meta-field--date-order">
          <span className="product-card__meta-label">Дата поступления</span>
          <span className="product-card__meta-value">{resolvedOrderDate ? formatSlashDate(resolvedOrderDate) : '—'}</span>
        </div>
        <div className="product-card__price product-card__price--orders">
          <span className="product-card__price-usd">
            ${resolvedPriceUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </span>
          <span className="product-card__price-uah">
            {resolvedPriceUAH.toLocaleString('uk-UA', { style: 'currency', currency: 'UAH', minimumFractionDigits: 0 })}
          </span>
        </div>
        {showDeleteButton && product && onDelete ? (
          <button
            className="product-card__delete-btn"
            aria-label="Удалить"
            onClick={() => onDelete(product.id)}
          >
            <span className="product-card__delete-icon" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ProductCardOrdersView;