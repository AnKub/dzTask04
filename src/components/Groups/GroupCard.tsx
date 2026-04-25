import React from 'react';
import { Group } from '../../types/group';
import './GroupCard.scss';

interface GroupCardProps {
  group: Group;
  productsCount: number;
  active: boolean;
  onClick: () => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, productsCount, active, onClick }) => {
  const shortDate = new Date(group.date).toLocaleDateString('uk-UA');
  const isoDate = new Date(group.date).toISOString().slice(0, 10);

  return (
    <button className={`group-card${active ? ' group-card--active' : ''}`} onClick={onClick} type="button">
      <span className="group-card__icon" />
      <span className="group-card__name" title={group.name}>{group.name}</span>
      <span className="group-card__count">
        {productsCount}
        <span className="group-card__count-label">продукта</span>
      </span>
      <span className="group-card__date">
        {shortDate}
        <span className="group-card__date-secondary">{isoDate}</span>
      </span>
    </button>
  );
};

export default GroupCard;
