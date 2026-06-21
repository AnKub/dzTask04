// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import SidebarNavItem from './SidebarNavItem';
// import './SidebarNav.scss';

// type SidebarNavProps = {
//   onNavigate?: () => void;
// };

// const SidebarNav: React.FC<SidebarNavProps> = ({ onNavigate }) => {
//   const { t } = useTranslation();
//   const navItems = [
//     { label: t('nav.orders'), path: '/orders' },
//     { label: t('nav.groups'), path: '/groups' },
//     { label: t('nav.products'), path: '/products' },
//     { label: t('nav.users'), path: '/users' },
//     { label: t('nav.settings'), path: '/settings' },
//   ];

//   return (
//     <nav className="sidebar-nav">
//       {navItems.map((item) => (
//         <SidebarNavItem key={item.path} label={item.label} path={item.path} onNavigate={onNavigate} />
//       ))}
//     </nav>
//   );
// };

// export default SidebarNav;
