import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const languageMenuRef = useRef<HTMLDivElement | null>(null);
  const searchValue = useMemo(() => new URLSearchParams(location.search).get('q') ?? '', [location.search]);
  const languageOptions = [
  { code: 'uk', label: 'UA', flag: '🇺🇦' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
] as const;
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language ?? 'uk';
  const currentLanguageOption = languageOptions.find((language) => currentLanguage.startsWith(language.code)) ?? languageOptions[0];

  const handleLanguageChange = (language: 'uk' | 'en' | 'es') => {
    if (currentLanguage === language) {
      setLanguageMenuOpen(false);
      return;
    }

    void i18n.changeLanguage(language);
    setLanguageMenuOpen(false);
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

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
          <div className="header__language-switch" ref={languageMenuRef}>
            <button
              type="button"
              className="header__language-trigger"
              onClick={() => setLanguageMenuOpen((prev) => !prev)}
              aria-label={t('header.language')}
              aria-expanded={isLanguageMenuOpen}
              aria-haspopup="menu"
              title={t(`header.languages.${currentLanguageOption.code}`)}
            >
              <span className="header__language-flag" aria-hidden="true">{currentLanguageOption.flag}</span>
              <span className="header__language-label">{currentLanguageOption.label}</span>
              <span className={`header__language-caret${isLanguageMenuOpen ? ' header__language-caret--open' : ''}`} aria-hidden="true" />
            </button>
            {isLanguageMenuOpen ? (
              <div className="header__language-menu" role="menu" aria-label={t('header.language')}>
                {languageOptions.filter((language) => !currentLanguage.startsWith(language.code)).map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    className="header__language-option"
                    onClick={() => handleLanguageChange(language.code)}
                    aria-label={t('header.changeLanguageTo', { language: t(`header.languages.${language.code}`) })}
                    title={t(`header.languages.${language.code}`)}
                    role="menuitem"
                  >
                    <span className="header__language-flag" aria-hidden="true">{language.flag}</span>
                    <span className="header__language-option-text">{t(`header.languages.${language.code}`)}</span>
                  </button>
                ))}
              </div>
            ) : null}
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
