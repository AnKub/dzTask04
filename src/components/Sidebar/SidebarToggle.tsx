import React from 'react';
import './SidebarToggle.scss';

type SidebarToggleProps = {
  collapsed: boolean;
  onToggle: () => void;
};

const SidebarToggle: React.FC<SidebarToggleProps> = ({ collapsed, onToggle }) => (
  <button
    className={`sidebar-toggle${collapsed ? ' sidebar-toggle--collapsed' : ''}`}
    aria-label={collapsed ? 'Открыть меню' : 'Скрыть меню'}
    onClick={onToggle}
    tabIndex={0}
  >
    <span className="sidebar-toggle__icon" />
  </button>
);

export default SidebarToggle;
