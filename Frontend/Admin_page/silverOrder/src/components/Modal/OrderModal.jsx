import React from 'react';
import './Modal.css';

const OrderModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose} className="close-modal">X</button>
      </div>
    </div>
  );
};

export default OrderModal;
