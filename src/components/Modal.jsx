import React, { useEffect, useState } from 'react';

export default function Modal({ isOpen, onClose, children, className }) {
  const [mounted, setMounted] = useState(isOpen);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (isOpen) {
      setMounted(true);
      // allow browser to paint before adding visible class
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = 'hidden';
    } else if (mounted) {
      setVisible(false);
      timeoutId = setTimeout(() => {
        setMounted(false);
        document.body.style.overflow = '';
      }, 220);
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  // NOTE: Backdrop clicks and Escape key no longer close the modal.
  // Closing should happen only via explicit controls (e.g. the X button)

  if (!mounted) return null;

  return (
    <div className={`modal_root ${visible ? 'modal_visible' : ''}`}>
      <div className={`modal_content ${visible ? 'modal_content_visible' : ''} ${className || ''}`}>
        {children}
      </div>
    </div>
  );
}
