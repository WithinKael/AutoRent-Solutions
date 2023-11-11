import React from 'react';
import FormFilter from '../Components/FormFilter';
import { useSelector } from 'react-redux';
import CarList from '../Components/CarList';

export const Catalog = () => {
  const carsData = useSelector(state => state.cars.carsData);

  return (
    <div className='catalog'>
      <FormFilter carsData={carsData} />
      <CarList carsData={carsData} />
    </div>
  );
};

export default Catalog;
