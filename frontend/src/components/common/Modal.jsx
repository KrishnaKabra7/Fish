import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components.css';
import Button from './Button';

/**
 * A reusable modal dialog component.
 * @param {boolean} isOpen - Controls if the modal is visible.
 * @param {function} onClose - Function to call when the modal should be closed.
 * @param {string} title - The title displayed at the top of the modal.
 * @param {node} children - The content to display inside the modal body.
 */
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;