import React, { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
 const { t, i18n } = useTranslation();
  const searchValue = useMemo(() => new URLSearchParams(location.search).get('q') ?? '', [location.search]);
  const languageOptions = [
  { code: 'uk', label: 'UA', flag: '🇺🇦' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
] as const;

const currentLanguage = i18n.resolvedLanguage ?? i18n.language ?? 'uk';

const handleLanguageChange = (language: 'uk' | 'en' | 'es') => {
  if (currentLanguage === language) {
    return;
  }

  void i18n.changeLanguage(language);
};

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
               placeholder={t('header.search')}
            />
          </div>
        </div>
        <div className="header__right">
        <div className="header__language-switch" aria-label={t('header.language')}>
  {languageOptions.map((language) => {
    const isActive = currentLanguage.startsWith(language.code);

    return (
      <button
        key={language.code}
        type="button"
        className={`header__language-button${isActive ? ' header__language-button--active' : ''}`}
        onClick={() => handleLanguageChange(language.code)}
        aria-label={t('header.changeLanguageTo', { language: t(`header.languages.${language.code}`) })}
        aria-pressed={isActive}
        title={t(`header.languages.${language.code}`)}
      >
        <span className="header__language-flag" aria-hidden="true">{language.flag}</span>
        <span className="header__language-label">{language.label}</span>
      </button>
    );
  })}
</div>
          <div className="header__icons">
            <button
              className="header__icon header__icon--search"           
              aria-label={t('header.search')}
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
                aria-label={t('header.menu')}
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
            placeholder={t('header.search')}
          />
        </div>
      ) : null}
    </header>
  );
};

export default Header;
