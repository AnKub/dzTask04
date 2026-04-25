import React from 'react';
import SidebarNavItem from './SidebarNavItem';
import './SidebarNav.scss';

const navItems = [
  { label: 'ПРИХОД', path: '/orders' },
  { label: 'ГРУПЫ', path: '/groups' },
  { label: 'ПРОДУКТЫ', path: '/products' },
  { label: 'ПОЛЬЗОВАТЕЛИ', path: '/users' },
  { label: 'НАСТРОЙКИ', path: '/settings' },
];

type SidebarNavProps = {
  onNavigate?: () => void;
};

const SidebarNav: React.FC<SidebarNavProps> = ({ onNavigate }) => (
  <nav className="sidebar-nav">
    {navItems.map((item) => (
      <SidebarNavItem key={item.path} label={item.label} path={item.path} onNavigate={onNavigate} />
    ))}
  </nav>
);

export default SidebarNav;
