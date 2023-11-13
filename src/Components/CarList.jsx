import React, { useEffect, useState } from 'react';
import css from '../css/CarList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCarsThunk, getCarsThunk } from '../redux/thunks';
import Modal from './Modal';
import { deleteFavorites, setFavorites } from '../redux/carsReducer';

const CarList = () => {
  const dispatch = useDispatch();
  const brandFilterValue = useSelector(state => state.cars.brandFilter);
  const priceFilterValue = useSelector(state => state.cars.priceFilter);
  const millegeOneValue = useSelector(state => state.cars.millegeOneValue);
  const millegeTwoValue = useSelector(state => state.cars.millegeTwoValue);
  const favoritesArray = useSelector(state => state.cars.favorites);
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

  const handleClickIcon = car => {
    if (favoritesArray.some(item => item.id === car.id)) {
      dispatch(deleteFavorites(car));
    } else {
      dispatch(setFavorites(car));
    }
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
        return (
          Number(car.mileage) >= millegeOneValue &&
          Number(car.mileage) <= millegeTwoValue
        );
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    onClick={() => handleClickIcon(car, index)}
                    className={
                      favoritesArray.some(item => item.id === car.id)
                        ? css.svgActive
                        : css.svg
                    }
                  >
                    <path
                      d="M15.63 3.4575C15.2469 3.07425 14.7921 2.77023 14.2915 2.56281C13.7909 2.35539 13.2543 2.24863 12.7125 2.24863C12.1706 2.24863 11.634 2.35539 11.1334 2.56281C10.6329 2.77023 10.178 3.07425 9.79497 3.4575L8.99997 4.2525L8.20497 3.4575C7.4312 2.68373 6.38174 2.24903 5.28747 2.24903C4.19319 2.24903 3.14374 2.68373 2.36997 3.4575C1.5962 4.23127 1.1615 5.28072 1.1615 6.375C1.1615 7.46927 1.5962 8.51873 2.36997 9.2925L3.16497 10.0875L8.99997 15.9225L14.835 10.0875L15.63 9.2925C16.0132 8.90943 16.3172 8.45461 16.5247 7.95401C16.7321 7.45342 16.8388 6.91686 16.8388 6.375C16.8388 5.83313 16.7321 5.29657 16.5247 4.79598C16.3172 4.29539 16.0132 3.84056 15.63 3.4575Z"
                      strokeOpacity="0.8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                      {car.address.split(' ')[3]}
                    </li>
                    <li className={css.secondaryStatsItem}>
                      {car.address.split(' ')[4]}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    onClick={() => handleClickIcon(car, index)}
                    className={
                      favoritesArray.some(item => item.id === car.id)
                        ? css.svgActive
                        : css.svg
                    }
                  >
                    <path
                      d="M15.63 3.4575C15.2469 3.07425 14.7921 2.77023 14.2915 2.56281C13.7909 2.35539 13.2543 2.24863 12.7125 2.24863C12.1706 2.24863 11.634 2.35539 11.1334 2.56281C10.6329 2.77023 10.178 3.07425 9.79497 3.4575L8.99997 4.2525L8.20497 3.4575C7.4312 2.68373 6.38174 2.24903 5.28747 2.24903C4.19319 2.24903 3.14374 2.68373 2.36997 3.4575C1.5962 4.23127 1.1615 5.28072 1.1615 6.375C1.1615 7.46927 1.5962 8.51873 2.36997 9.2925L3.16497 10.0875L8.99997 15.9225L14.835 10.0875L15.63 9.2925C16.0132 8.90943 16.3172 8.45461 16.5247 7.95401C16.7321 7.45342 16.8388 6.91686 16.8388 6.375C16.8388 5.83313 16.7321 5.29657 16.5247 4.79598C16.3172 4.29539 16.0132 3.84056 15.63 3.4575Z"
                      strokeOpacity="0.8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                      {car.address.split(' ')[3]}
                    </li>
                    <li className={css.secondaryStatsItem}>
                      {car.address.split(' ')[4]}
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
      {carsData.length < 32 &&
        !brandFilterValue &&
        !priceFilterValue &&
        !millegeOneValue &&
        !millegeTwoValue && (
          <button
            type="button"
            className={css.btnLoadMore}
            onClick={handleLoadMoreClick}
          >
            Load More
          </button>
        )}
    </div>
  );
};

export default CarList;
