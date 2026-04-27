import React, { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import menuIcon from '../../assets/menu.svg';
import searchIcon from '../../assets/search.svg';
import Logo from '../Logo/Logo';
import SearchInput from '../SearchInput/SearchInput';
import DateTimeBlock from '../DateTimeBlock/DateTimeBlock';
import './Header.scss';

type HeaderProps = {
  onMenuToggle: () => void;
  showMenuButton: boolean;
};

const Header: React.FC<HeaderProps> = ({ onMenuToggle, showMenuButton }) => {
  const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchValue = useMemo(() => new URLSearchParams(location.search).get('q') ?? '', [location.search]);

  const handleSearchIconClick = () => {
    setMobileSearchOpen((prev) => !prev);
  };

  const handleMenuIconClick = () => {
    onMenuToggle();
  };

  const handleSearchChange = useCallback((value: string) => {
    const currentSearchValue = new URLSearchParams(location.search).get('q') ?? '';
    const normalizedValue = value.trim();

    if (currentSearchValue === normalizedValue) {
      return;
    }

    const nextParams = new URLSearchParams(location.search);

    if (normalizedValue) {
      nextParams.set('q', normalizedValue);
    } else {
      nextParams.delete('q');
    }

    navigate({ pathname: location.pathname, search: nextParams.toString() }, { replace: true });
  }, [location.pathname, location.search, navigate]);

  return (
    <header className={`header${isMobileSearchOpen ? ' header--mobile-search-open' : ''}`}>
      <div className="header__bar">
        <div className="header__left">
          <Logo hideTextOnMobile />
        </div>
        <div className="header__center">
          <div className="header__search">
            <SearchInput
              value={searchValue}
              onSearchChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="header__right">
          <div className="header__icons">
            <button
              className="header__icon header__icon--search"
              aria-label="Пошук"
              onClick={handleSearchIconClick}
              tabIndex={0}
            >
              <img className="header__search-image" src={searchIcon} alt="" aria-hidden="true" />
            </button>
          </div>
          <DateTimeBlock />
          {showMenuButton ? (
            <button
              className="header__icon header__icon--menu"
              aria-label="Меню"
              onClick={handleMenuIconClick}
              tabIndex={0}
            >
              <img className="header__menu-image" src={menuIcon} alt="" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>
      {isMobileSearchOpen ? (
        <div className="header__mobile-search">
          <SearchInput
            isMobile
            value={searchValue}
            onSearchChange={handleSearchChange}
            onClose={() => setMobileSearchOpen(false)}
          />
        </div>
      ) : null}
    </header>
  );
};

export default Header;
