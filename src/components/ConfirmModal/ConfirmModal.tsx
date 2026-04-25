import React from 'react';
import './ConfirmModal.scss';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, onClose, onConfirm, text }) => {
  if (!open) return null;
  return (
    <div className="confirm-modal__backdrop" onClick={onClose}>
      <div className="confirm-modal" onClick={e => e.stopPropagation()}>
        <div className="confirm-modal__header">
          <span>Подтверждение</span>
          <button className="confirm-modal__close" onClick={onClose} aria-label="Закрыть">×</button>
        </div>
        <div className="confirm-modal__body">{text || 'Вы действительно хотите удалить этот элемент?'}</div>
        <div className="confirm-modal__actions">
          <button className="btn btn-secondary" onClick={onClose}>Отмена</button>
          <button className="btn btn-success" onClick={onConfirm}>Подтвердить</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
