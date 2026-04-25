import React, { useState } from 'react';
import { Product } from '../../types/product';
import './ProductCard.scss';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
  groupName?: string;
  orderName?: string;
  orderDate?: string;
  groupCount?: number;
  expanded?: boolean;
  showDetailsToggle?: boolean;
  variant?: 'orders' | 'products' | 'groups';
  onGroupOpen?: (groupId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDelete,
  groupName,
  orderName,
  orderDate,
  groupCount,
  expanded,
  showDetailsToggle = true,
  variant = 'orders',
  onGroupOpen,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const isExpanded = expanded ?? showDetails;
  const productDate = new Date(product.date);
  const shortDate = productDate.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit' });
  const fullDate = productDate.toLocaleDateString('uk-UA');
  const formatSlashDate = (value: string) => {
    const [year, month, day] = value.slice(0, 10).split('-');
    return `${day}/${month}/${year}`;
  };
  const conditionLabel = product.condition === 'б/у' ? 'Б/У' : 'Новый';

  if (variant === 'groups') {
    return (
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
  }

  if (variant === 'orders') {
    return (
      <div className="product-card product-card--orders">
        <div className="product-card__orders-row">
          <div className="product-card__name-block product-card__name-block--orders">
            <span className="product-card__name" title={orderName ?? product.name}>{orderName ?? product.name}</span>
          </div>
          <button
            className="product-card__group-link"
            type="button"
            aria-label={groupName ? `Открыть группу ${groupName}` : 'Открыть группу'}
            onClick={() => onGroupOpen?.(product.groupId)}
          >
            <span className="product-card__group-link-icon" aria-hidden="true" />
            <span className="product-card__group-link-count">{groupCount ?? 0}</span>
          </button>
          <div className="product-card__meta-field product-card__meta-field--date-order">
            <span className="product-card__meta-label">Дата поступления</span>
            <span className="product-card__meta-value">{orderDate ? formatSlashDate(orderDate) : formatSlashDate(product.date)}</span>
          </div>
          <div className="product-card__price product-card__price--orders">
            <span className="product-card__price-usd">
              ${product.priceUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
            <span className="product-card__price-uah">
              {product.priceUAH.toLocaleString('uk-UA', { style: 'currency', currency: 'UAH', minimumFractionDigits: 0 })}
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
  }

  if (variant === 'products') {
    return (
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
            <span className="product-card__meta-value">{conditionLabel}</span>
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
  }

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
            onClick={() => setShowDetails((value) => !value)}
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

export default ProductCard;
