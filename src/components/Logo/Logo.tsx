import React from 'react';
import logoIcon from '../../assets/logo-icon.png';
import './Logo.scss';

type LogoProps = {
  hideTextOnMobile?: boolean;
};

const Logo: React.FC<LogoProps> = ({ hideTextOnMobile }) => (
  <div className="logo">
    <img src={logoIcon} alt="Logo" className="logo__icon" />
    <span className={`logo__text${hideTextOnMobile ? ' logo__text--hide-mobile' : ''}`}>OctopusCorp</span>
  </div>
);

export default Logo;
