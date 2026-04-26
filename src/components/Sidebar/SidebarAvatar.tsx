import React from 'react';
import './SidebarAvatar.scss';

const SidebarAvatar: React.FC = () => (
  <div className="sidebar-avatar">
    <div className="sidebar-avatar__img">
      <img className="sidebar-avatar__photo" src={`${process.env.PUBLIC_URL}/images/avadefault.png`} alt="Аватар по умолчанию" />
      <span className="sidebar-avatar__gear" />
    </div>
  </div>
);

export default SidebarAvatar;
