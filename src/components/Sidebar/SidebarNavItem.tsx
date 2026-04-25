import React from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarNavItem.scss';

type SidebarNavItemProps = {
  label: string;
  path: string;
  onNavigate?: () => void;
};

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ label, path, onNavigate }) => (
  <NavLink to={path} onClick={onNavigate} className={({ isActive }) => `sidebar-nav-item${isActive ? ' sidebar-nav-item--active' : ''}`}>
    <span className="sidebar-nav-item__text">{label}</span>
    <span className="sidebar-nav-item__underline" />
  </NavLink>
);

export default SidebarNavItem;
