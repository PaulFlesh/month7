import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import modalStyles from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

export default function Modal(props) {
  const { title, onClose } = props; // eslint-disable-line

  function closeByEscape(evt) {
    if (evt.key === "Escape") {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape)
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
  modalStyleSwitch(props.title);

  return ReactDOM.createPortal(
    (
      <ModalOverlay handleClose={onClose}>
        <div className={containerStyle} >
          <div className={titleStyle} >
            {props.title}
          </div>
          <div className={modalStyles.close_icon}>
            <CloseIcon onClick={onClose} />
          </div>
          {props.children}
        </div>
      </ModalOverlay>
    ), document.getElementById('modals')
  )
}

Modal.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onClose: PropTypes.func
}
