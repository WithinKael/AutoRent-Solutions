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

  function getMinimumAge(rentalConditions) {
    const conditionsArray = rentalConditions.split('\n');
    const minimumAge = conditionsArray[0].replace('Minimum age: ', '');
    return minimumAge;
  }

  return (
    <div className={css.Overlay} onClick={onOverlayClick}>
      <div className={css.Modal}>
        <svg
          className={css.closeIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          onClick={onCloseModal}
        >
          <path
            d="M18 6L6 18"
            stroke="#121417"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="#121417"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div className={css.modalContainer}>
          <img src={modalData.img} alt="" className={css.modalImage} />
          <p className={css.carName}>
            {modalData.make + ' '}
            <span className={css.carModel}>{modalData.model}</span>
            {', '}
            {modalData.year}
          </p>
          <ul className={css.secondaryStatsList}>
            <li className={css.secondaryStatsItem}>
              {modalData.address.split(' ')[3]}
            </li>
            <li className={css.secondaryStatsItem}>
              {modalData.address.split(' ')[4]}
            </li>
            <li className={css.secondaryStatsItem}>Id: {modalData.id}</li>
            <li className={css.secondaryStatsItem}>Year: {modalData.year}</li>
            <li className={css.secondaryStatsItem}>Type: {modalData.type}</li>
            <li className={css.secondaryStatsItem}>
              Fuel Consumption: {modalData.fuelConsumption}
            </li>
            <li className={css.secondaryStatsItem}>
              Engine Size: {modalData.engineSize}
            </li>
          </ul>
          <p className={css.description}>{modalData.description}</p>
          <h2 className={css.titleFunc}>Accessories and functionalities:</h2>
          <ul className={css.statsAccessories}>
            <li className={css.statsAccessoriesItem}>
              {modalData.accessories.join(' | ')}
            </li>
            <li className={css.statsAccessoriesItem}>
              {modalData.functionalities.join(' | ')}
            </li>
          </ul>
          <h2 className={css.titleRental}>Rental Conditions:</h2>
          <ul className={css.statsRental}>
            <li className={css.statsRentalItem}>
              Minimum Age:
              <span className={css.spanItem}>
                {getMinimumAge(modalData.rentalConditions)}
              </span>
            </li>
            <li className={css.statsRentalItem}>
              {modalData.rentalConditions.split('\n')[1]}
            </li>
            <li className={css.statsRentalItem}>
              {' '}
              {modalData.rentalConditions.split('\n')[2]}
            </li>
            <li className={css.statsRentalItem}>
              Mileage: <span className={css.spanItem}>{modalData.mileage}</span>
            </li>
            <li className={css.statsRentalItem}>
              Price:
              <span className={css.spanItem}>
                {modalData.rentalPrice.replace('$', '') + '$'}
              </span>
            </li>
          </ul>
          <button type="button" className={css.btnRentalCar}>
            <a href={`tel:${+380730000000}`} className={css.linkRentalCar}>
              Rental car
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
