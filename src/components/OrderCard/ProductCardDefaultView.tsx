import React from 'react';
import { ProductCardDefaultViewProps } from './ProductCard.types';

const ProductCardDefaultView: React.FC<ProductCardDefaultViewProps> = ({
  product,
  onDelete,
  groupName,
  orderName,
  isExpanded,
  showDetailsToggle,
  onToggleDetails,
}) => {
  const productDate = new Date(product.date);
  const shortDate = productDate.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit' });
  const fullDate = productDate.toLocaleDateString('uk-UA');

  return (
    <div className={`product-card${isExpanded ? ' product-card--open' : ''}${showDetailsToggle ? '' : ' product-card--without-toggle'}`}>
      <div className="product-card__main">
        <div className="product-card__name-block">
          <span className="product-card__name" title={product.name}>{product.name}</span>
          <span className="product-card__serial">{product.serialNumber}</span>
          {orderName ? <span className="product-card__order-name">{orderName}</span> : null}
        </div>
        <span className="product-card__number">{product.number}</span>
        <span className="product-card__date">
          <span className="product-card__date-short">{shortDate}</span>
          <span className="product-card__date-full">{fullDate}</span>
        </span>
        <span className="product-card__price">
          <span className="product-card__price-uah">
            {product.priceUAH.toLocaleString('uk-UA', { style: 'currency', currency: 'UAH', minimumFractionDigits: 0 })}
          </span>
          <span className="product-card__price-usd">
            ${product.priceUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </span>
        </span>
        {isExpanded ? (
          <div className="product-card__details">
            <span className="product-card__status">{product.status}</span>
            <span className="product-card__warranty">Гарантия: с {product.warrantyFrom} по {product.warrantyTo}</span>
            <span className="product-card__condition">{product.condition.toUpperCase()}</span>
            {groupName ? <span className="product-card__group">{groupName}</span> : null}
            <span className="product-card__type">Тип: {product.type}</span>
            <span className="product-card__spec">Спецификация: {product.specification}</span>
          </div>
        ) : null}
        {showDetailsToggle ? (
          <button
            className="product-card__details-btn"
            aria-label="Детали"
            onClick={onToggleDetails}
          >
            <span className="product-card__details-icon" />
          </button>
        ) : null}
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
};

export default ProductCardDefaultView;