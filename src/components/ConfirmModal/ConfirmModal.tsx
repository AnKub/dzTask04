import React from 'react';
import { useTranslation } from 'react-i18next';
import './ConfirmModal.scss';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, onClose, onConfirm, text }) => {
  const { t } = useTranslation();

  if (!open) return null;
  return (
    <div className="confirm-modal__backdrop" onClick={onClose}>
      <div className="confirm-modal" onClick={e => e.stopPropagation()}>
        <div className="confirm-modal__header">
         <span>{t('modal.confirmTitle')}</span>
          <button className="confirm-modal__close" onClick={onClose} aria-label={t('modal.close')}>×</button> 
            </div>
       <div className="confirm-modal__body">{text || t('modal.deletePrompt')}</div>
        <div className="confirm-modal__actions">
          <button className="btn btn-secondary" onClick={onClose}>{t('modal.cancel')}</button>
          <button className="btn btn-success" onClick={onConfirm}>{t('modal.confirm')}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
