import React from "react";
import PropTypes from 'prop-types';
import modalOverlay from './ModalOverlay.module.css';

export default function ModalOverlay({ children, handleClose }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    function closeByOutOfFocus(evt) {
      if (evt.target === ref.current) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", closeByOutOfFocus);
    return () => {
      document.removeEventListener("mousedown", closeByOutOfFocus);
    }
  }, []);

  return (
    <div className={modalOverlay.container} tabIndex={0} ref={ref}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element,
  handleClose: PropTypes.func.isRequired
};
