import React, { useState } from 'react';
import ProductCardDefaultView from './ProductCardDefaultView';
import ProductCardGroupsView from './ProductCardGroupsView';
import ProductCardOrdersView from './ProductCardOrdersView';
import ProductCardProductsView from './ProductCardProductsView';
import { ProductCardBaseProps } from './ProductCard.types';
import './ProductCard.scss';

interface ProductCardProps extends ProductCardBaseProps {
  expanded?: boolean;
  showDetailsToggle?: boolean;
  variant?: 'orders' | 'products' | 'groups';
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDelete,
  groupName,
  orderName,
  orderDate,
  orderId,
  groupCount,
  priceUAH,
  priceUSD,
  expanded,
  showDetailsToggle = true,
  variant = 'orders',
  showDeleteButton = true,
  onGroupOpen,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const isExpanded = expanded ?? showDetails;

  if (variant === 'orders') {
    return (
      <ProductCardOrdersView
        product={product}
        onDelete={onDelete}
        orderName={orderName}
        orderDate={orderDate}
        orderId={orderId}
        groupCount={groupCount}
        priceUAH={priceUAH}
        priceUSD={priceUSD}
        showDeleteButton={showDeleteButton}
        onGroupOpen={onGroupOpen}
      />
    );
  }

  if (!product || !onDelete) {
    return null;
  }

  if (variant === 'groups') {
    return <ProductCardGroupsView product={product} onDelete={onDelete} />;
  }

  if (variant === 'products') {
    return (
      <ProductCardProductsView
        product={product}
        onDelete={onDelete}
        groupName={groupName}
        orderName={orderName}
        orderDate={orderDate}
      />
    );
  }

  return (
    <ProductCardDefaultView
      product={product}
      onDelete={onDelete}
      groupName={groupName}
      orderName={orderName}
      isExpanded={isExpanded}
      showDetailsToggle={showDetailsToggle}
      onToggleDetails={() => setShowDetails((value) => !value)}
    />
  );
};

export default ProductCard;
