import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import './SearchInput.scss';

type SearchInputProps = {
  isMobile?: boolean;
  onClose?: () => void;
  value?: string;
  onSearchChange?: (value: string) => void;
  debounceMs?: number;
  placeholder?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  isMobile,
  onClose,
  value = '',
  onSearchChange,
  debounceMs = 350,
  placeholder = '',
}) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebouncedValue(inputValue, debounceMs);
  const { t } = useTranslation();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    onSearchChange?.(debouncedValue.trim());
  }, [debouncedValue, onSearchChange]);

  return (
    <div className={`search-input${isMobile ? ' search-input--mobile' : ''}`}> 
      <input
        className="search-input__field"
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label={placeholder}
      />
      {isMobile && (
        <button
          className="search-input__close"
          aria-label={t('header.closeSearch')}
          onClick={onClose}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchInput;
