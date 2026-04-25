import React, { useMemo, useState } from 'react';
import './AddProductModal.scss';

type AddProductFormPayload = {
  name: string;
  serialNumber: string;
  status: 'свободен' | 'в ремонте';
  condition: 'новый' | 'б/у';
  type: string;
  specification: string;
  priceUAH: number;
  priceUSD: number;
  warrantyFrom: string;
  warrantyTo: string;
};

interface AddProductModalProps {
  open: boolean;
  groupName: string;
  onClose: () => void;
  onSubmit: (payload: AddProductFormPayload) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ open, groupName, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [status, setStatus] = useState<'свободен' | 'в ремонте'>('свободен');
  const [condition, setCondition] = useState<'новый' | 'б/у'>('новый');
  const [type, setType] = useState('');
  const [specification, setSpecification] = useState('');
  const [priceUAH, setPriceUAH] = useState('');
  const [priceUSD, setPriceUSD] = useState('');
  const [warrantyFrom, setWarrantyFrom] = useState('');
  const [warrantyTo, setWarrantyTo] = useState('');

  const isValid = useMemo(
    () => name.trim().length > 1 && serialNumber.trim().length > 2 && type.trim().length > 1,
    [name, serialNumber, type]
  );

  if (!open) return null;

  const resetForm = () => {
    setName('');
    setSerialNumber('');
    setStatus('свободен');
    setCondition('новый');
    setType('');
    setSpecification('');
    setPriceUAH('');
    setPriceUSD('');
    setWarrantyFrom('');
    setWarrantyTo('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;
    onSubmit({
      name: name.trim(),
      serialNumber: serialNumber.trim(),
      status,
      condition,
      type: type.trim(),
      specification: specification.trim(),
      priceUAH: Number(priceUAH) || 0,
      priceUSD: Number(priceUSD) || 0,
      warrantyFrom,
      warrantyTo,
    });
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="add-product-modal__backdrop" onClick={handleClose}>
      <form className="add-product-modal" onClick={(event) => event.stopPropagation()} onSubmit={handleSubmit}>
        <div className="add-product-modal__header">
          <span>Добавить товар в {groupName}</span>
          <button className="add-product-modal__close" type="button" onClick={handleClose} aria-label="Закрыть">×</button>
        </div>
        <div className="add-product-modal__body">
          <label className="add-product-modal__field">
            <span>Название</span>
            <input className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label className="add-product-modal__field">
            <span>Серийный номер</span>
            <input className="form-control" value={serialNumber} onChange={(event) => setSerialNumber(event.target.value)} />
          </label>
          <label className="add-product-modal__field">
            <span>Тип</span>
            <input className="form-control" value={type} onChange={(event) => setType(event.target.value)} placeholder="Например, монитор" />
          </label>
          <label className="add-product-modal__field add-product-modal__field--wide">
            <span>Спецификация</span>
            <input className="form-control" value={specification} onChange={(event) => setSpecification(event.target.value)} placeholder={'Например, 24", FullHD, IPS'} />
          </label>
          <label className="add-product-modal__field">
            <span>Статус</span>
            <select className="form-select" value={status} onChange={(event) => setStatus(event.target.value as 'свободен' | 'в ремонте')}>
              <option value="свободен">свободен</option>
              <option value="в ремонте">в ремонте</option>
            </select>
          </label>
          <label className="add-product-modal__field">
            <span>Состояние</span>
            <select className="form-select" value={condition} onChange={(event) => setCondition(event.target.value as 'новый' | 'б/у')}>
              <option value="новый">новый</option>
              <option value="б/у">б/у</option>
            </select>
          </label>
          <label className="add-product-modal__field">
            <span>Цена, UAH</span>
            <input className="form-control" type="number" min="0" step="1" value={priceUAH} onChange={(event) => setPriceUAH(event.target.value)} />
          </label>
          <label className="add-product-modal__field">
            <span>Цена, USD</span>
            <input className="form-control" type="number" min="0" step="1" value={priceUSD} onChange={(event) => setPriceUSD(event.target.value)} />
          </label>
          <label className="add-product-modal__field">
            <span>Гарантия с</span>
            <input className="form-control" type="date" value={warrantyFrom} onChange={(event) => setWarrantyFrom(event.target.value)} />
          </label>
          <label className="add-product-modal__field">
            <span>Гарантия до</span>
            <input className="form-control" type="date" value={warrantyTo} onChange={(event) => setWarrantyTo(event.target.value)} />
          </label>
        </div>
        <div className="add-product-modal__actions">
          <button className="btn btn-outline-secondary" type="button" onClick={handleClose}>Отмена</button>
          <button className="btn btn-success" type="submit" disabled={!isValid}>Добавить</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductModal;
