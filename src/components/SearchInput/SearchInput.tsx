import React, { useEffect, useState } from 'react';
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
  placeholder = 'Поиск',
}) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebouncedValue(inputValue, debounceMs);

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
        aria-label="Пошук"
      />
      {isMobile && (
        <button
          className="search-input__close"
          aria-label="Закрити пошук"
          onClick={onClose}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchInput;
