import React from "react";
import modalOverlayStyles from './ModalOverlay.module.css';

export default function ModalOverlay({ children, handleClose }) {
  return (
    <div className={modalOverlayStyles.container} onClick={handleClose}>
      {children}
    </div>
  );
}
