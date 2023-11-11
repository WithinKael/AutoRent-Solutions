import React from 'react';
import css from '../css/FormFilter.module.css';
import brands from '../Data/makes.json';

const FormFilter = () => {
  const handleSubmit = event => {
    event.preventDefault();
  };

  const makeDropdownPrice = () => {
    const array = [];
    for (let i = 10; i < 300; i += 10) {
      array.push(i);
    }
    return array;
  };

  const handleSelectChange = event => {
    console.log(event.target.value);
  };

  const dropDownArrayPrice = makeDropdownPrice();

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.selectContainer}>
        <label className={css.label}>Car brand</label>
        <select className={css.selectBrand} onChange={handleSelectChange}>
          <option hidden>Enter the text</option>
          {brands.map((brand, index) => (
            <option value={brand} key={index}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={css.selectContainer}>
        <label className={css.label}>Price/ 1 hour</label>
        <select className={css.selectPrice} onChange={handleSelectChange}>
          <option value="" hidden>
            To $
          </option>
          {dropDownArrayPrice.map((price, index) => (
            <option key={index} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>

      <div className={css.selectContainer}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.inputContainer}>
          <input placeholder="From" type="number" className={css.inputOne} />
          <input placeholder="To" type="number" className={css.inputTwo} />
        </div>
      </div>

      <div className={css.selectContainer}>
        <button type="submit" className={css.formButton}>
          Search
        </button>
      </div>
    </form>
  );
};

export default FormFilter;
