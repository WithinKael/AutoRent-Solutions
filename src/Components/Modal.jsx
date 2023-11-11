import React, { useEffect } from 'react';
import css from '../css/Modal.module.css';

const Modal = ({ onCloseModal, modalData }) => {
  useEffect(() => {
    const onEscapeDown = event => {
      if (event.key === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', onEscapeDown);

    return () => {
      window.removeEventListener('keydown', onEscapeDown);
    };
  }, [onCloseModal]);

  const onOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={onOverlayClick}>
      <div className={css.Modal}>
        <div className={css.modalContainer}>
          <img src={modalData.img} alt="" className={css.modalImage} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
