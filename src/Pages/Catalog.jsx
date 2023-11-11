import React from 'react';
import FormFilter from '../Components/FormFilter';

import CarList from '../Components/CarList';

const Catalog = () => {
  return (
    <div className="catalog">
      <FormFilter />
      <CarList />
    </div>
  );
};

export default Catalog;
