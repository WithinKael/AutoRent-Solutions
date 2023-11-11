import React from 'react';
import css from '../css/CarList.module.css';

const CarList = ({ carsData }) => {
  return (
    <div className={css.carListContainer}>
      <ul className={css.carList}>
        {carsData.map((car, index) => (
          <li key={index} className={css.carListItem}>
            <img src={car.img} alt="" className={css.carImage} />
            <div className={css.mainStatsCar}>
              <p>
                {car.make + ' '}
                <span style={{ color: '#3470FF' }}>{car.model}</span>
                {', '}
                {car.year}
              </p>
              <p>{car.rentalPrice}</p>
            </div>
            <ul className={css.secondaryStatsCar}>
              <li className={css.secondaryStatsItem}>
                {car.address.split(', ')[1]}
              </li>
              <li className={css.secondaryStatsItem}>
                {car.address.split(', ')[2]}
              </li>
              <li className={css.secondaryStatsItem}>{car.rentalCompany}</li>
              <li className={css.secondaryStatsItem}></li>
              <li className={css.secondaryStatsItem}>{car.type}</li>
              <li className={css.secondaryStatsItem}>{car.model}</li>
              <li className={css.secondaryStatsItem}>{car.id}</li>
              <li className={css.secondaryStatsItem}></li>
            </ul>
            <button type="button" className={css.itemButton}>
              Learn more
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className={css.btnLoadMore}>
        Load More
      </button>
    </div>
  );
};

export default CarList;
