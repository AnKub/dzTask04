import React from 'react';
import SidebarAvatar from './SidebarAvatar';
import SidebarNav from './SidebarNav';
import SidebarToggle from './SidebarToggle';
import './Sidebar.scss';

type SidebarProps = {
  collapsed: boolean;
  isCompactMode: boolean;
  isMobileOpen: boolean;
  onToggleDesktop: () => void;
  onRequestCloseMobile: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  isCompactMode,
  isMobileOpen,
  onToggleDesktop,
  onRequestCloseMobile,
}) => {
  const sidebarClassName = [
    'sidebar',
    collapsed && !isCompactMode ? ' sidebar--collapsed' : '',
    isCompactMode ? ' sidebar--compact' : '',
    isMobileOpen ? ' sidebar--mobile-open' : '',
  ].join('');

  return (
    <>
      {isCompactMode && isMobileOpen ? <button type="button" className="sidebar__overlay" aria-label="Закрыть меню" onClick={onRequestCloseMobile} /> : null}
      <aside className={sidebarClassName}>
        {!isCompactMode ? <SidebarToggle collapsed={collapsed} onToggle={onToggleDesktop} /> : null}
        <div className="sidebar__content">
          <SidebarAvatar />
          <SidebarNav onNavigate={isCompactMode ? onRequestCloseMobile : undefined} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
