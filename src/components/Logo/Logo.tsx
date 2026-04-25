import React from 'react';
import './Logo.scss';

type LogoProps = {
  hideTextOnMobile?: boolean;
};

const Logo: React.FC<LogoProps> = ({ hideTextOnMobile }) => (
  <div className="logo">
    <span className="logo__icon" />
    <span className={`logo__text${hideTextOnMobile ? ' logo__text--hide-mobile' : ''}`}>Inventory</span>
  </div>
);

export default Logo;
