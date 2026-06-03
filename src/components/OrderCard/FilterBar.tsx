import React from 'react';
import { useTranslation } from 'react-i18next';
import './FilterBar.scss';

interface FilterBarProps {
  type: string;
  specification: string;
  typeQuery: string;
  specificationQuery: string;
  types: string[];
  specifications: string[];
  onTypeChange: (type: string) => void;
  onSpecificationChange: (spec: string) => void;
  onTypeQueryChange: (value: string) => void;
  onSpecificationQueryChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  type,
  specification,
  typeQuery,
  specificationQuery,
  types,
  specifications,
  onTypeChange,
  onSpecificationChange,
  onTypeQueryChange,
  onSpecificationQueryChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="filter-bar">
      <div className="filter-bar__group">
        <label className="filter-bar__label" htmlFor="type-filter">{t('filters.type')}</label>
        <div className="filter-bar__controls">
          <select id="type-filter" className="filter-bar__select" value={type} onChange={(e) => onTypeChange(e.target.value)}>
            <option value="">{t('filters.allTypes')}</option>
            {types.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <input
            className="filter-bar__input"
            type="text"
            value={typeQuery}
            onChange={(e) => onTypeQueryChange(e.target.value)}
            placeholder={t('filters.searchType')}
          />
        </div>
      </div>
      <div className="filter-bar__group">
        <label className="filter-bar__label" htmlFor="spec-filter">{t('filters.specification')}</label>
        <div className="filter-bar__controls">
          <select id="spec-filter" className="filter-bar__select" value={specification} onChange={(e) => onSpecificationChange(e.target.value)}>
            <option value="">{t('filters.allSpecifications')}</option>
            {specifications.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <input
            className="filter-bar__input"
            type="text"
            value={specificationQuery}
            onChange={(e) => onSpecificationQueryChange(e.target.value)}
            placeholder={t('filters.searchSpecification')}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
