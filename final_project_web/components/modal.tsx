import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-1/2">
        <div className="flex p-4 justify-end">
          <button onClick={onClose} className="text-gray-500 text-4xl  hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="px-8">{children}</div>
      </div>
    </div>
  );
};

export default Modal;