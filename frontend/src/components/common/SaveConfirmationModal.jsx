import React from 'react';
import './SaveConfirmationModal.css';

const SaveConfirmationModal = ({ isOpen, onSave, onDiscard, onCancel, changedCount }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Unsaved Changes</h3>
        </div>
        <div className="modal-body">
          <p>You have {changedCount} unsaved product{changedCount !== 1 ? 's' : ''}.</p>
          <p>Do you want to save your changes?</p>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-discard" onClick={onDiscard}>
            Discard
          </button>
          <button className="btn-save" onClick={onSave}>
            Save All
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveConfirmationModal;
