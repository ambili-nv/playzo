// Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="relative bg-white rounded-lg p-8">
          <h3 className="text-lg font-semibold mb-4">Confirm Cancellation</h3>
          <p className="mb-4">Are you sure you want to cancel this booking?</p>
          <div className="flex justify-end">
            <button className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={onCancel}>
              Cancel
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
