import { ReactNode, FC, useRef, useEffect } from "react";
import modalOverlayStyles from './ModalOverlay.module.css';

interface IModalOverlayProps {
  children: ReactNode,
  handleClose: () => void
}

const ModalOverlay: FC<IModalOverlayProps> = ({ children, handleClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    function closeByLayover(e: MouseEvent): void {
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

export default ModalOverlay;
