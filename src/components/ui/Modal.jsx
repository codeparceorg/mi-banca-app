import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
        {children}
      </div>
    </div>
  );
}

Modal.Header = function ModalHeader({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-100 font-bold text-[#1E3A8A] text-lg ${className}`}>
      {children}
    </div>
  );
};

Modal.Content = function ModalContent({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

Modal.Footer = function ModalFooter({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 border-t border-gray-100 flex justify-end gap-3 ${className}`}>
      {children}
    </div>
  );
};
