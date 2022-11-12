import React from "react";
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import modalStyles from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

export default function Modal({ children, title, handleClose}) {
  function closeByEscape(evt) {
    if(evt.key === "Escape") {
      handleClose();
    }
  }

  React.useEffect(()=>{
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    }
  });

  let containerStyle = '';
  let titleStyle = '';

  function modalStyleSwitch(modalTitle) {
    if (parseInt(modalTitle)) {
      containerStyle = `${modalStyles.container} pt-30 pr-25 pb-30 pl-25`;
      titleStyle = `${modalStyles.number} text text_type_digits-large`;
    } else {
      containerStyle = `${modalStyles.container} pt-10 pr-10 pb-15 pl-10`;
      titleStyle = `${modalStyles.text} text text_type_main-large`;
    }
  }
  modalStyleSwitch(title);

  return ReactDOM.createPortal(
    (
      <ModalOverlay handleClose={handleClose}>
        <div className={containerStyle} >
          <div className={titleStyle} >
            {title}
          </div>
          <div className={modalStyles.close_icon}>
            <CloseIcon onClick={handleClose} />
          </div>
          {children}
        </div>
      </ModalOverlay>
    ), document.body
  )
}

Modal.propTypes = {
  title: PropTypes.string
};