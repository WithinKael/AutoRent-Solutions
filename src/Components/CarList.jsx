import React, { useEffect, useState } from 'react';
import css from '../css/CarList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCarsThunk, getCarsThunk } from '../redux/thunks';
import Modal from './Modal';

const CarList = () => {
  const dispatch = useDispatch();
  const brandFilterValue = useSelector(state => state.cars.brandFilter);
  const priceFilterValue = useSelector(state => state.cars.priceFilter);
  const millegeOneValue = useSelector(state => state.cars.millegeOneValue);
  const millegeTwoValue = useSelector(state => state.cars.millegeTwoValue);
  const [modal, setModal] = useState({ isOpen: false, modalData: null });
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getCarsThunk(page));
    dispatch(getAllCarsThunk());
  }, [dispatch, page]);

  const carsData = useSelector(state => state.cars.carsData);
  const carsDataFilter = useSelector(state => state.cars.carsDataFilter);

  const handleOpenModal = modalData => {
    setModal({ isOpen: true, modalData: modalData });
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, modalData: null });
  };

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
    dispatch(getCarsThunk(page));
  };

  const filterByBrandsAndPrice = () => {
    let filteredCars = carsDataFilter;

    if (brandFilterValue) {
      filteredCars = filteredCars.filter(car =>
        car.make.toLowerCase().includes(brandFilterValue.toLowerCase().trim())
      );
    }

    if (priceFilterValue) {
      filteredCars = filteredCars.filter(car => {
        return (
          parseFloat(car.rentalPrice.replace('$', '')) <=
          parseFloat(priceFilterValue)
        );
      });
    }

    if (millegeOneValue && millegeTwoValue) {
      filteredCars = filteredCars.filter(car => {
        return car.mileage >= millegeOneValue && car.mileage <= millegeTwoValue;
      });
    }

    return filteredCars;
  };
  const filteredCarsByBrand = filterByBrandsAndPrice();

  return (
    <div className={css.carListContainer}>
      {filteredCarsByBrand.length === 0 ? (
        <h2>No results</h2>
      ) : (
        <ul className={css.carList}>
          {brandFilterValue ||
          priceFilterValue ||
          millegeOneValue ||
          millegeTwoValue
            ? filteredCarsByBrand.map((car, index) => (
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
                    <li className={css.secondaryStatsItem}>
                      {car.rentalCompany}
                    </li>
                    <li className={css.secondaryStatsItem}>{car.type}</li>
                    <li className={css.secondaryStatsItem}>{car.model}</li>
                    <li className={css.secondaryStatsItem}>{car.id}</li>
                    <li className={css.secondaryStatsItem}>
                      {car.accessories[0].split(' ').slice(0, 2).join(' ')}
                    </li>
                  </ul>
                  <button
                    type="button"
                    className={css.itemButton}
                    onClick={() => handleOpenModal(car)}
                  >
                    Learn more
                  </button>
                </li>
              ))
            : carsData.map((car, index) => (
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
                    <li className={css.secondaryStatsItem}>
                      {car.rentalCompany}
                    </li>
                    <li className={css.secondaryStatsItem}>{car.type}</li>
                    <li className={css.secondaryStatsItem}>{car.model}</li>
                    <li className={css.secondaryStatsItem}>{car.id}</li>
                    <li className={css.secondaryStatsItem}>
                      {car.accessories[0].split(' ').slice(0, 2).join(' ')}
                    </li>
                  </ul>
                  <button
                    type="button"
                    className={css.itemButton}
                    onClick={() => handleOpenModal(car)}
                  >
                    Learn more
                  </button>
                </li>
              ))}
        </ul>
      )}
      {modal.isOpen === true ? (
        <Modal onCloseModal={handleCloseModal} modalData={modal.modalData} />
      ) : null}
      {carsData.length < 32 && filteredCarsByBrand.length !== 0 ? (
        <button
          type="button"
          className={css.btnLoadMore}
          onClick={handleLoadMoreClick}
        >
          Load More
        </button>
      ) : null}
    </div>
  );
};

export default CarList;
