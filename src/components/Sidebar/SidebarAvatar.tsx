import React from 'react';
import { useTranslation } from 'react-i18next';
import './SidebarAvatar.scss';

const SidebarAvatar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="sidebar-avatar">
      <div className="sidebar-avatar__img">
        <img className="sidebar-avatar__photo" src={`${process.env.PUBLIC_URL}/images/avadefault.png`} alt={t('sidebar.avatarAlt')} />
        <span className="sidebar-avatar__gear" />
      </div>
    </div>
  );
};

export default SidebarAvatar;
