import React, { useEffect } from 'react';
import css from '../css/CarList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCarsThunk } from '../redux/thunks';

const CarList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarsThunk());
  }, [dispatch]);

  const carsData = useSelector(state => state.cars.carsData);

  return (
    <div className={css.carListContainer}>
      <ul className={css.carList}>
        {carsData.map((car, index) => (
          <li key={index} className={css.carListItem}>
            <img src={car.img} alt="" className={css.carImage} />
            <div className={css.mainStatsCar}>
              <p className={css.paragraph}>
                {car.make + ' '}
                <span className={css.span}>{car.model}</span>
                {', '}
                {car.year}
              </p>
              <p className={css.paragraph}>{car.rentalPrice}</p>
            </div>
            <ul className={css.secondaryStatsList}>
              <li className={css.secondaryStatsItem}>
                {car.address.split(',')[1]}
              </li>
              <li className={css.secondaryStatsItem}>{car.rentalCompany}</li>
              <li className={css.secondaryStatsItem}>{car.type}</li>
              <li className={css.secondaryStatsItem}>{car.model}</li>
              <li className={css.secondaryStatsItem}>{car.id}</li>
              <li className={css.secondaryStatsItem}>
                {car.accessories[0].split(' ').slice(0, 2).join(' ')}
              </li>
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
