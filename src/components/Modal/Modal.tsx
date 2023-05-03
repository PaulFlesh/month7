import { useEffect, FC, ReactNode } from "react";
import ReactDOM from 'react-dom';
import modalStyles from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

interface IModalProps {
  title?: string,
  children: ReactNode,
  onClose: () => void
}

const Modal: FC<IModalProps> = ({ title, children, onClose }) => {
  function closeByEscape(evt: KeyboardEvent): void {
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

  function modalStyleSwitch(modalTitle: string): void {
    if (parseInt(modalTitle)) {
      containerStyle = `${modalStyles.container} pt-30 pr-25 pb-30 pl-25`;
      titleStyle = `${modalStyles.number} text text_type_digits-large`;
    } else {
      containerStyle = `${modalStyles.container} pt-10 pr-10 pb-15 pl-10`;
      titleStyle = `${modalStyles.text} text text_type_main-large`;
    }
  }

  if (title) {
    modalStyleSwitch(title);
  }

  const modals = document.getElementById('modals') as HTMLElement;

  return ReactDOM.createPortal(
    (
      <ModalOverlay handleClose={onClose}>
        <div className={containerStyle} >
          <div className={titleStyle} >
            {title}
          </div>
          <div className={modalStyles.close_icon}>
            <CloseIcon type='primary' onClick={onClose} />
          </div>
          {children}
        </div>
      </ModalOverlay>
    ), modals
  )
};

export default Modal;
