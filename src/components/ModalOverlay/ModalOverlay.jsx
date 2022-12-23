import React from "react";
import modalOverlayStyles from './ModalOverlay.module.css';
import PropTypes from "prop-types";

export default function ModalOverlay({ children, handleClose }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current.focus();
  }, []);

  React.useEffect(() => {
    function closeByLayover(e) {
      if (e.target === ref.current) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", closeByLayover);
    return () => {
      document.removeEventListener("mousedown", closeByLayover);
    };
  }, [handleClose]);
  
  return (
    <div className={modalOverlayStyles.container} ref={ref}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func
}
